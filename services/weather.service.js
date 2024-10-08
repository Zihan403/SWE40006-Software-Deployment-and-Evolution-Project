const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const apikey= process.env.WEATHER_API_KEY;
const fetchcurrentweatherdataforcity = async (city) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apikey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {fetchcurrentweatherdataforcity};