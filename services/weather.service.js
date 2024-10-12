const axios = require("axios");
const CurrentWeather = require("../models/currentweather.model");  // Import the Weather model

const fetchWeatherData = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);
    // Return an instance of the Weather model
    return new CurrentWeather(
      data.location.tz_id.split("/")[1],
      data.location.country,
      data.current.temp_c,
      data.current.is_day === 1 ? "Day" : "Night",
      data.current.condition.text,
      data.current.wind_kph,
      data.current.humidity,
      data.current.uv
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Error fetching weather data"
    );
  }
};

const fetchWeatherDataForCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Return an instance of the Weather model
    return new CurrentWeather(
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.is_day === 1 ? "Day" : "Night",
      data.current.condition.text,
      data.current.wind_kph,
      data.current.humidity,
      data.current.uv
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Error fetching weather data"
    );
  }
};

module.exports = { fetchWeatherData, fetchWeatherDataForCity };