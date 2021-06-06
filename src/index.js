// current date/time
function formatDate() {
  let today = new Date();
  let date = today.getDate();
  let year = today.getFullYear();
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = today.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  let monthIndex = today.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[monthIndex];
  return `${day}, ${month} ${date}, ${year} <br> ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

//search city tab
function citySearch(city) {
  let apiKey = "f2385ad9d5dc3434f38126f0279324c2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchPlace(event) {
  event.preventDefault();
  let cityX = document.querySelector("h1");
  let cityInput = document.querySelector("#search-city-input");

  cityX.innerHTML = cityInput.value;
  citySearch(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchPlace);

//weather condition display

function showTemperature(response) {
  let cityX = document.querySelector("h1");
  cityX.innerHTML = response.data.name;
  let realTemperature = document.querySelector(".temperature-box");
  let temperature = Math.round(response.data.main.temp);
  realTemperature.innerHTML = `${temperature}`;
}

//geolocation pin
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f2385ad9d5dc3434f38126f0279324c2";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiGeoUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector(".location-button");
currentLocation.addEventListener("click", getCurrentPosition);

