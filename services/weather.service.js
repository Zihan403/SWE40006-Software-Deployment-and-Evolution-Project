const axios = require("axios");
const CurrentWeather = require("../models/currentweather.model");  // Import the Weather model

// IP-based location API endpoint
const IP_API_URL = 'http://ip-api.com/json/';

// Function to fetch weather data using latitude and longitude or IP-based geolocation if lat/lon is null
const fetchWeatherData = async (lat, lon, ipAddress = null) => {
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    // If lat and lon are null or empty, use IP-based geolocation
    if (!lat || !lon) {
      // Use IP geolocation to get lat/lon
      const ipResponse = await axios.get(`${IP_API_URL}${ipAddress || ''}`);
      const ipData = ipResponse.data;
      lat = ipData.lat;
      lon = ipData.lon;
      console.log(`Using IP-based location: ${ipData.city}, ${ipData.country}`);
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Return an instance of the CurrentWeather model
    return new CurrentWeather(
      data.location.tz_id.split("/")[1],  // City or location name
      data.location.country,              // Country name
      data.current.temp_c,                // Temperature in Celsius
      data.current.is_day === 1 ? "Day" : "Night",  // Day or Night
      data.current.condition.text,        // Weather condition
      data.current.wind_kph,              // Wind speed in kph
      data.current.humidity,              // Humidity percentage
      data.current.uv                     // UV index
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Error fetching weather data"
    );
  }
};

// Function to fetch weather data for a specific city
const fetchWeatherDataForCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Return an instance of the CurrentWeather model
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
