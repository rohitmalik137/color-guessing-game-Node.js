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
    // console.log(username);
    const userAdd = new User({
        username: username,
        score: 0
      });
      return userAdd.save()
        .then(result => {
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
                                // console.log('Color saved!!');
                                res.redirect('home');
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
                            console.log('Color saved!!');
                            console.log(color);
                            res.redirect('home');
                        });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.homePage = (req, res, next) => {
    Color.findOne({dummy: 'dummy'})
        .then(colorsArr => {
            // console.log(colorsArr.color[2]);
            res.render('home', {
                pageTitle: 'Home',
                colorsArr: colorsArr.color
            });
        })
        .catch(err => console.log(err));
};

exports.getEvaluate = (req, res, next) => {
    const getInput = req.body.colorname;
    const level = req.body.level;
    var fibonnaci = shuffleArray.data.getFibonnaciNumber(level) - 1;
    Color.findOne({dummy: 'dummy'})
        .then(color => {
            User.findOne()
                .sort({ createdAt: -1})
                .then(user => {
                    if(getInput.localeCompare(color.answerColor[fibonnaci]) == 0){
                        user.score += 10
                    }
                    else{
                        user.score -= 10
                    }
                    user.save()
                        .then(result => {
                            // console.log('score response saved!');
                            Color.findOne({dummy: 'dummy'})
                                .then(color => {
                                    const colorss = shuffleArray.data.shuffle(colors);
                                    if(color.length != 0){
                                        color.color = colorss;
                                        color.level = color.level + 1;
                                        return color.save()
                                            .then(() => {
                                                // console.log('Updated!!');
                                                Color.findOne({dummy: 'dummy'})
                                                    .then(colorr => {
                                                        var fibonnaci = shuffleArray.data.getFibonnaciNumber(colorr.level);
                                                        res.render('startgame', {
                                                            pageTitle: 'Color Guess Game',
                                                            colorsArr: color,
                                                            lastLevel: (color.level === 6) ? 'yes' : null,
                                                            fibonnaci: fibonnaci
                                                        });
                                                    })
                                            });
                                    }
                                    return res.redirect('/home');
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                });
        });
}

exports.getStartGamePage = (req, res, next) => {
    Color.findOne({dummy: 'dummy'})
        .then(color => {
            const colorss = shuffleArray.data.shuffle(colors);
            if(color.length != 0){
                color.color = colorss;
                color.level = 1;
                return color.save()
                    .then(() => {
                        // console.log('Updated!!');
                        Color.findOne({dummy: 'dummy'})
                            .then(colorr => {
                                var fibonnaci = shuffleArray.data.getFibonnaciNumber(colorr.level);
                                res.render('startgame', {
                                    pageTitle: 'Color Guess Game',
                                    colorsArr: color,
                                    fibonnaci: fibonnaci,
                                    lastLevel: ''
                                });
                            })
                    });
            }
            return res.redirect('/home');
        })
        .catch(err => console.log(err));
};

exports.getHighScore = (req, res, next) => {
    // console.log('high score pr pahuch gya hurrreeeee!!')
    User.findOne()
        .sort({ createdAt: -1})
        .then(user => {
            // console.log(user);
            res.render('showScore', {
                pageTitle: 'Your Score',
                user: user
            })
        })
}

exports.getInstructionsPage = (req, res, next) => {
    res.render('instructions', {
        pageTitle: 'Instructions'
    })
}