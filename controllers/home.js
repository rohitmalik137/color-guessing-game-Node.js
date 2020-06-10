const shuffleArray = require('../public/js/shuffle');
const Color = require('../models/color');
const User = require('../models/user');
const Answer = require('../models/answers');

const colors = ['black', '#fce803', '#fc0303', '#fc8403', '#d9b38c' , '#4afc03', '#03fcf4', 'white', '#0394fc', '#0f03fc', '#8c03fc', '#ff40ec', '#ff267d'];

const colorss = shuffleArray.data.shuffle(colors);

exports.getlogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
    // console.log(colorss);
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    console.log(username);
    const userAdd = new User({
        username: username,
        score: 0
      });
      return userAdd.save()
        .then(result => {
            console.log('Added Success');
            Color.find()
                .then(user => {
                    if(user.length != 0){
                        return Color.deleteOne()
                            .then(result => {
                                console.log(result);
                            })
                            .catch(err => console.log(err));
                    }
                })
                .then(result => {
                    const colorAdd = new Color({
                        color: colorss
                    });
                    return colorAdd.save()
                        .then(result => {
                            console.log('Colors addition success!');
                            res.redirect('/home');
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.homePage = (req, res, next) => {
    const ansColors = Color.findOne()
        .then(colorsArr => {
            // console.log(colorsArr.color[2]);
            Answer.find()
                .then(user => {
                    if(user.length != 0){
                        return Answer.deleteOne()
                            .then(result => {
                                console.log(result);
                            })
                            .catch(err => console.log(err));
                    }
                })
                .then(result => {
                    const answerAddColor = new Answer({
                        color: colorsArr
                    });
                    return answerAddColor.save()
                        .then(result => {
                            console.log('answers added!!');
                            res.render('home', {
                                pageTitle: 'Home',
                                colorsArr: colorsArr.color,
                            });
                        })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.getEvaluate = (req, res, next) => {
    const getInput = req.body.colorname;
    console.log(getInput);
}