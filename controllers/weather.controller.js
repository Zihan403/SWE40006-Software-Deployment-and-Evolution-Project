const weatherservice=require('../services/weather.service');
const getweatherofcity = async (req, res) => {
  const city = req.query.city;
    try{ 
      const weatherdata = await weatherservice.fetchcurrentweatherdataforcity(city);
      res.json(weatherdata);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {getweatherofcity};
