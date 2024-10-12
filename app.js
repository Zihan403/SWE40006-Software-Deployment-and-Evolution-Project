const express= require('express');
const dotenv= require('dotenv');
const weatherroute= require('./routes/weather.route');
dotenv.config();
const app= express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(weatherroute);
module.exports= app;