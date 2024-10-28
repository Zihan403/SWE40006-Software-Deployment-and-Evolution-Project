let currentTime; // Global variable to store the current time as a Date object

function stringToTime(localtime) {
  const dateTimeParts = localtime.split(" ");
  const dateParts = dateTimeParts[0].split("-");
  const timeParts = dateTimeParts[1].split(":");
  return new Date(
    dateParts[0], // Year
    dateParts[1] - 1, // Month (0-indexed)
    dateParts[2], // Day
    timeParts[0], // Hours
    timeParts[1], // Minutes
    0, // Ensure seconds start at 0
    0 // Ensure milliseconds start at 0
  );
}

function updateTime() {
  // Increase the time by 1 second using the more reliable method of adding milliseconds
  currentTime = new Date(currentTime.getTime() + 1000);

  // Format the date and time
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString("default", { month: "long" });
  const year = currentTime.getFullYear();

  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Construct the formatted date and time string including seconds
  const formattedTime = `${day} ${month}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;

  // Update the live-timer element with the formatted time
  document.getElementById("live-timer").innerText = formattedTime;
  console.log(formattedTime);

  // Also update the local-time element with the new time in the same format as before (YYYY-MM-DD HH:MM:SS)
  const yearStr = currentTime.getFullYear().toString();
  const monthStr = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  const dayStr = currentTime.getDate().toString().padStart(2, "0");
  const hoursStr = currentTime.getHours().toString().padStart(2, "0");
  const minutesStr = currentTime.getMinutes().toString().padStart(2, "0");
  const secondsStr = currentTime.getSeconds().toString().padStart(2, "0");
  document.getElementById(
    "local-time"
  ).innerText = `${yearStr}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const data = {
    location: document
      .getElementById("location")
      .innerText.split(",")[0]
      .trim(),
    country: document.getElementById("location").innerText.split(",")[1].trim(),
    temperature: document.getElementById("temperature").innerText,
    condition: document.getElementById("condition").innerText,
    wind_speed_kph: document.getElementById("wind").innerText,
    humidity: document.getElementById("humidity").innerText,
    uv: document.getElementById("uv").innerText,
    is_day: document.getElementById("is-day").innerText,
    localTime: document.getElementById("local-time").innerText.trim(),
  };

  console.log(data);

  // Initialize the global currentTime variable from the local-time element
  currentTime = stringToTime(data.localTime);

  const weatherIcon = document.getElementById("weather-icon");
  const condition = data.condition.toLowerCase();
  const isDay = data.is_day === "Day";

  weatherIcon.classList.remove("hidden");

  const body = document.body;
  const hours = currentTime.getHours();

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

  // Set the initial time display
  updateTime();

  // Set up an interval to update the time every second AFTER currentTime is initialized
  setInterval(() => {
    updateTime(); // Call updateTime each second  
  }, 1000);
});

document
  .getElementById("city-input")
  .addEventListener("input", async function (event) {
    const input = event.target.value.toLowerCase();

    if (input.length === 0) {
      clearSuggestions();
      return;
    }

    // Fetch the cities from the cities.json file
    const cities = await fetchCities();
    const matches = findMatches(input, cities);

    displaySuggestions(matches);
  });

// Fetch cities from cities.json
async function fetchCities() {
  try {
    const response = await fetch("/cities.json");
    if (!response.ok) throw new Error("Failed to load cities data.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function findMatches(input, cities) {
  const matches = [];

  // Go through each country and its cities
  for (const country in cities) {
    const countryCities = cities[country];

    // Filter cities within each country
    countryCities.forEach((city) => {
      if (city.toLowerCase().includes(input)) {
        matches.push({ city, country });
      }
    });
  }

  // Return top 3 matching results
  return matches.slice(0, 5);
}

// Display suggestions under the search bar
function displaySuggestions(matches) {
  const suggestionsList = document.getElementById("suggestions-list");
  clearSuggestions(); // Clear any previous suggestions

  if (matches.length === 0) return;

  matches.forEach((match) => {
    const li = document.createElement("li");
    li.classList.add("cursor-pointer", "p-2", "hover:bg-gray-200");

    li.textContent = `${match.city}, ${match.country}`;

    li.addEventListener("click", () => {
      document.getElementById("city-input").value = match.city; // Set the clicked city in the input
      clearSuggestions(); // Clear suggestions after selection
    });

    suggestionsList.appendChild(li);
  });
}

// Clear the suggestions list
function clearSuggestions() {
  const suggestionsList = document.getElementById("suggestions-list");
  suggestionsList.innerHTML = "";
}

// Search form submission
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;

    if (!city) {
      alert("Please enter a city name");
      return;
    }

    // Redirect to the route with the city query
    window.location.href = `/?city=${city}`;
  });
