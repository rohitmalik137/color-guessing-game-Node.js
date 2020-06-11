const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.getlogin);
router.post('/login', homeController.postLogin);

router.get('/home', homeController.homePage);

router.post('/evaluate', homeController.getEvaluate);
router.post('/showScore', homeController.getHighScore);
router.get('/startgame', homeController.getStartGamePage);
router.get('/instructions', homeController.getInstructionsPage);

module.exports = router;