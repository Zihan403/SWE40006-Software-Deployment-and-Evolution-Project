const express = require("express");
const weatherController = require("../controllers/weather.controller");
const router = express.Router();

router.get("/", weatherController.getWeather);
router.get("/getWeather", weatherController.getWeatherByLocation);

module.exports = router;