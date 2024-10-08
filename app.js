const express= require('express');
const dotenv= require('dotenv');
const weatherroutes= require('./routes/weather.route');
dotenv.config();
const app= express();
const PORT = process.env.PORT || 3000;
app.use(express.static('views'));
app.use('/api/weather', weatherroutes);
module.exports= app;
