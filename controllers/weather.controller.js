const weatherService = require("../services/weather.service");

const getWeather = async (req, res) => {
  const defaultCity = req.query.city;

  try {
    const city = defaultCity ? defaultCity : "Melbourne";

    const weatherData = await weatherService.fetchWeatherDataForCity(city);
    console.log(weatherData);
    res.render("current_weather", { weather: weatherData });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

const getWeatherByLocation = async (req, res) => {
  const { lat, lon } = req.query;

  if (lat && lon) {
    try {
      const weatherData = await weatherService.fetchWeatherData(lat, lon);
      console.log(lat, lon);
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log("Fetching weather data by IP address");
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
      const weatherData = await weatherService.fetchWeatherData(ipAddress);
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getWeather, getWeatherByLocation };