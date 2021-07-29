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


//geolocation pin
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f2385ad9d5dc3434f38126f0279324c2";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiGeoUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector(".location-button");
currentLocation.addEventListener("click", getCurrentPosition);


//search city tab
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  let iconElement = document.querySelector("#icon"); 
  let precipitationElement = document.querySelector("#precipitation");

  celsiusTemperature = response.data.main.temp;


  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}



function search(city) {
let apiKey = "f2385ad9d5dc3434f38126f0279324c2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
let cityInputElement = document.querySelector("#search-city-input");
search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Bristol");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML = 
    forecastHTML + 
    `
    <div class="col-2">
    <div class="weather-forecast-date"> ${day}</div>
    <img 
    src="https://openweathermap.org/img/wn/50d@2x.png" 
    alt="" 
    width="42"/>
    <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">10°/</span>
    <span class="weather-forecast-temperature-min">4°</span>
    </div>
    </div>
    `
    ;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();