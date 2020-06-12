const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

router.get('/', authController.getlogin);
router.post('/', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/home', isAuth, homeController.homePage);

router.post('/evaluate', isAuth, homeController.getEvaluate);
router.post('/showScore', isAuth, homeController.getHighScore);
router.get('/startgame', isAuth, homeController.getStartGamePage);
router.get('/instructions', isAuth, homeController.getInstructionsPage);

module.exports = router;