const axios = require("axios");
const CurrentWeather = require("../models/currentweather.model");  // Import the Weather model

// Fetch weather by latitude and longitude or by IP
const fetchWeatherData = async (lat, lon, ipAddress = null) => {
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    let query = '';

    if (lat && lon) {
      // Use lat/lon if available
      query = `${lat},${lon}`;
    } else if (ipAddress) {
      // If lat/lon not provided, fallback to using the IP address
      query = ipAddress;
    } else {
      throw new Error("Either lat/lon or IP address must be provided");
    }

    // Use the same API URL for lat/lon or IP
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);

    // Return an instance of the CurrentWeather model
    return new CurrentWeather(
      data.location.tz_id.split("/")[1],  // Location name (e.g., city)
      data.location.country,              // Country
      data.current.temp_c,                // Temperature in Celsius
      data.current.is_day === 1 ? "Day" : "Night",  // Day or Night
      data.current.condition.text,        // Weather condition (e.g., "Sunny")
      data.current.wind_kph,              // Wind speed in kph
      data.current.humidity,              // Humidity
      data.current.uv                     // UV index
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.error?.message || "Error fetching weather data"
    );
  }
};

// Fetch weather by city name
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
