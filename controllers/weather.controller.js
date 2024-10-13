const weatherService = require("../services/weather.service");

// Fetch weather by city name from search input
const getWeatherByCity = async (req, res) => {
  var { city } = req.query;

  if (!city) {
    city = "Melbourne";
  }

  try {
    const weatherData = await weatherService.fetchWeatherDataForCity(city);
    res.render("current_weather", { weather: weatherData });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

module.exports = { getWeatherByCity };