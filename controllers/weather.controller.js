const weatherService = require("../services/weather.service");

// Fetch weather by city or default city (Melbourne)
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

// Fetch weather by location or IP address
const getWeatherByLocation = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    let weatherData;

    if (lat && lon) {
      weatherData = await weatherService.fetchWeatherData(lat, lon);
    } else {
      console.log("Fetching weather data by IP address");

      // Get IP from headers or connection
      const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      weatherData = await weatherService.fetchWeatherData(null, null, ipAddress);
    }

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getWeather, getWeatherByLocation };