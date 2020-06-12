const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const homeRoutes = require('./routes/home');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://rohit_new:rohit_new@cluster0-po0x5.mongodb.net/guess_color?retryWrites=true&w=majority';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user){
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use(homeRoutes);

app.use('/', (req, res, next) => {
  res.redirect('/');
})

const port = process.env.PORT || 3000;

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(port, () => {
          console.log(`Server starting at ${port}`);
        });
      })
      .catch(err => {
        console.log(err);
      });