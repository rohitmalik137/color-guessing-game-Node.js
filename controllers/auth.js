const shuffleArray = require('../public/js/shuffle');
const Color = require('../models/color');
const User = require('../models/user');

const colors = ['black', '#fce803', '#fc0303', '#fc8403', '#d9b38c' , '#4afc03', '#03fcf4', '#8c03fc', '#ff40ec', '#ff267d'];

exports.getlogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
    // console.log(colorss);
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    let loadedUser;
    // console.log(username);
    User.findOne()
        .then(user => {
            console.log('__________________');
            console.log(user);
            console.log('__________________');
            if(user){
                user.username = username;
                user.score = 0;
                return user.save()
                    .then(() => {
                        console.log('user updated!');
                    })
                    .catch(err => console.log(err));
            }else{
                const userAdd = new User({
                    username: username,
                    score: 0
                  });
                  return userAdd.save();
            }
        })
        .then(result => {
            User.findOne()
                .sort({ createdAt: -1 })
                .then(user => {
                    loadedUser = user;
                    // console.log('user add ho gya!!');
                    Color.findOne({dummy: 'dummy'})
                        .then(color => {
                            const colorss = shuffleArray.data.shuffle(colors);
                            if(color){
                                color.color = colorss;
                                color.answerColor = colorss;
                                color.level = 0;
                                dummy = 'dummy';
                                return color.save()
                                    .then(() => {
                                        // console.log(loadedUser);
                                        req.session.isLoggedIn = true;
                                        req.session.user = loadedUser;
                                        return req.session.save(err => {
                                        if(err) console.log(err);
                                        else res.redirect('/home');
                                        });
                                    });
                            }
                            const colorsAdd = new Color({
                                color: colorss,
                                answerColor: colorss,
                                level: 0,
                                dummy: 'dummy'
                            });
                            return colorsAdd.save()
                                .then(() => {
                                    // console.log(loadedUser);
                                    req.session.isLoggedIn = true;
                                    req.session.user = loadedUser;
                                    return req.session.save(err => {
                                    if(err) console.log(err);
                                    else res.redirect('/home');
                                    });
                                });
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      if(err) console.log(err);
      res.redirect('/');
    });
};