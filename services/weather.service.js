const axios = require("axios");
const CurrentWeather = require("../models/currentweather.model");

// Fetch weather by city name
const fetchWeatherDataForCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Return an instance of the CurrentWeather model
    // Return an instance of the CurrentWeather model
    return new CurrentWeather(
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.is_day === 1 ? "Day" : "Night",
      data.current.condition.text,
      data.current.wind_kph,
      data.current.humidity,
      data.current.uv,
      data.current.condition.icon,
      data.location.localtime
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.error?.message || "Error fetching weather data"
    );
  }
};
module.exports = { fetchWeatherDataForCity };