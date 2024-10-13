class CurrentWeather {
  constructor(
    location,
    country,
    temperature,
    is_day,
    condition,
    wind_speed_kph,
    humidity,
    uv,
    icon,
    localTime
  ) {
    this.location = location;
    this.country = country;
    this.temperature = temperature;
    this.is_day = is_day;
    this.condition = condition;
    this.wind_speed_kph = wind_speed_kph;
    this.humidity = humidity;
    this.uv = uv;
    this.icon = icon;
    this.localTime = localTime;
  }
}

module.exports = CurrentWeather;