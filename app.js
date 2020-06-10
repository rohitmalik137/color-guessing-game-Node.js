const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');

const MONGODB_URI = 'mongodb+srv://rohit_new:rohit_new@cluster0-po0x5.mongodb.net/guess_color?retryWrites=true&w=majority';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

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