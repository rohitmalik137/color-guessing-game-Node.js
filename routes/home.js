const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.getlogin);
router.post('/login', homeController.postLogin);

router.get('/home', homeController.homePage);

router.post('/evaluate', homeController.getEvaluate)

module.exports = router;