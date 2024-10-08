const express = require('express');
const weathercontroller = require('../controllers/weather.controller');
const router = express.Router();
router.get('/', weathercontroller.getweatherofcity);
module.exports = router;
