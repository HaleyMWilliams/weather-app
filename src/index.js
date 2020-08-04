function showWeather(response) {
  let farenheitCurrentTemp = response.data.main.temp;
  let farenheitFeelsLike = response.data.main.feels_like;

  document.querySelector("#current-city").innerHTML = response.data.name;

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

function searchCity(city) {
  let apiKey = "f965be3a8c73441341db743d519d1c93";
  let units = "&units=imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
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

function showDateTime(event) {
  let now = new Date();
  let time = document.querySelector("#time");
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

  let day = days[now.getDay()];
  let hour = hours[now.getHours()];
  let minute = minutes[now.getMinutes()];
  time.innerHTML = `${day} ${hour}:${minute}`;
}

function displayCelsius(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#temp-current");
  let currentCelsius = ((farenheitCurrentTemp - 32) * 5) / 9;
  currentTempElement.innerHTML = Math.round(currentCelsius);

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeCelsius = ((farenheitFeelsLike - 32) * 5) / 9;
  feelsLikeElement.innerHTML = `${Math.round(
    feelsLikeCelsius
  )}<small>°C</small`;
}

function displayFarenheit(event) {
  event.preventDefault();
}

let farenheitCurrentTemp = null;

let farenheitFeelsLike = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let newCityForm = document.querySelector("#search-form");
newCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

showDateTime();

searchCity("New York");
