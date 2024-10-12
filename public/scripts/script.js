function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const timeString = `${hours
      .toString()
      .padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("live-timer").innerText = `${timeString}`;
  }
  
  setInterval(updateTime, 1000);
  
  function updateWeather(data) {
    document.getElementById(
      "location"
    ).innerText = `${data.location}, ${data.country}`;
    document.getElementById("condition").innerText = data.condition;
    document.getElementById("temperature").innerText = `${data.temperature}°C`;
    document.getElementById("wind").innerText = data.wind_speed_kph;
    document.getElementById("humidity").innerText = data.humidity;
    document.getElementById("uv").innerText = data.uv;
  
    const weatherIcon = document.getElementById("weather-icon");
    const condition = data.condition.toLowerCase();
    const isDay = data.is_day === "Day";
  
    if (condition.includes("thunderstorm")) {
      weatherIcon.src = "/images/cloud-bolt-solid.svg";
    } else if (condition.includes("heavy rain")) {
      weatherIcon.src = "/images/cloud-showers-heavy-solid.svg";
    } else if (condition.includes("rain")) {
      weatherIcon.src = "/images/cloud-rain-solid.svg";
    } else if (condition.includes("snow")) {
      weatherIcon.src = "/images/snowflake-solid.svg";
    } else if (condition.includes("cloudy") && isDay) {
      weatherIcon.src = "/images/cloud-sun-solid.svg";
    } else if (condition.includes("cloudy") && !isDay) {
      weatherIcon.src = "/images/cloud-moon-solid.svg";
    } else if (condition.includes("sunny") || condition.includes("clear")) {
      weatherIcon.src = isDay
        ? "/images/sun-solid.svg"
        : "/images/moon-solid.svg";
    } else {
      weatherIcon.src = isDay ? "/images/day.svg" : "/images/night.svg";
    }
  
    weatherIcon.classList.remove("hidden");
  
    const body = document.body;
    const hours = new Date().getHours();
  
    body.classList.remove("bg-day", "bg-night", "bg-afternoon", "bg-evening");
  
    if (isDay) {
      if (hours >= 15 && hours <= 18) {
        body.classList.add("bg-afternoon");
      } else if (hours >= 18 && hours <= 20) {
        body.classList.add("bg-evening");
      } else {
        body.classList.add("bg-day");
      }
    } else {
      body.classList.add("bg-night");
    }
  }
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 0,
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    fetch(`/getWeather?lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        updateWeather(data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }
  
  function error() {
    alert("Unable to retrieve your location.");
  }