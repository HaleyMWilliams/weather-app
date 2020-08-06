function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];

  let minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
  ];

  let day = days[date.getDay()];
  let hour = hours[date.getHours()];
  let minute = minutes[date.getMinutes()];
  return `${day} ${hour}:${minute}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];

  let minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
  ];

  let hour = hours[date.getHours()];
  let minute = minutes[date.getMinutes()];
  return `${hour}:${minute}`;
}

function showWeather(response) {
  farenheitCurrentTemp = response.data.main.temp;
  farenheitFeelsLike = response.data.main.feels_like;

  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#time").innerHTML = `Last Updated: ${formatDate(
    response.data.dt * 1000
  )}`;
  document.querySelector("#temp-current").innerHTML = `${Math.round(
    farenheitCurrentTemp
  )}`;

  document.querySelector("#feels-like").innerHTML = `${Math.round(
    farenheitFeelsLike
  )}<small>°F</small>`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#three-hour-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index <= 4; index++) {
    forecast = response.data.list[index];
    farenheitForecastTemp = forecast.main.temp;
    forecastElement.innerHTML += `
   <div class="col-2.4" id="three-hour-forecast">
      <p >${formatHours(forecast.dt * 1000)}</p>
      <img src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="forecastIcon" id="day-one-icon">
      </p>
   </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "f965be3a8c73441341db743d519d1c93";
  let units = "&units=imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "f965be3a8c73441341db743d519d1c93";
  let units = "&units=imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#temp-current");
  let currentCelsius = ((farenheitCurrentTemp - 32) * 5) / 9;
  currentTempElement.innerHTML = Math.round(currentCelsius);

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeCelsius = ((farenheitFeelsLike - 32) * 5) / 9;
  feelsLikeElement.innerHTML = `${Math.round(
    feelsLikeCelsius
  )}<span class="smaller">°C</span>`;

  let forecastTempElement = document.querySelector("#forecast-temp");
  let currentCelsiusForecast = ((farenheitForecastTemp - 32) * 5) / 9;
  forecastTempElement.innerHTML = `${Math.round(currentCelsiusForecast)}°C`;
}

function displayFarenheit(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#temp-current");
  currentTempElement.innerHTML = Math.round(farenheitCurrentTemp);

  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${Math.round(
    farenheitFeelsLike
  )}<span class="smaller">°F</span>`;

  let forecastTempElement = document.querySelector("#forecast-temp");
  forecastTempElement.innerHTML = `${Math.round(farenheitForecastTemp)}°F`;
}

let farenheitCurrentTemp = null;

let farenheitFeelsLike = null;

let farenheitForecastTemp = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let newCityForm = document.querySelector("#search-form");
newCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
