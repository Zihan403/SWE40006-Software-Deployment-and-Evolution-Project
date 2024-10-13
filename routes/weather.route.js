const express = require("express");
const weatherController = require("../controllers/weather.controller");
const router = express.Router();

// Search weather by city
router.get("/", weatherController.getWeatherByCity);

module.exports = router;