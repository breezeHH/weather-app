function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function sunriseTime(timestamp) {
  let sunrise = new Date(timestamp);
  let hours = sunrise.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = sunrise.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function sunsetTime(timestamp) {
  let sunset = new Date(timestamp);
  let hours = sunset.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = sunset.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function updateTime(timestamp) {
  let update = new Date(timestamp);
  let hours = update.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = update.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//in Matt's solution this function is called displayWeatherCondition
function showTemperature(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
  //ist besser "name" aus dem Api Call zu verwenden, denn da bekommt man meisten den richtigen
  //namen angezeigt auch wenn man alles klein schreibt

  let country = response.data.sys.country;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${country}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let currentCondition = response.data.weather[0].main;
  let currentConditionElement = document.querySelector("#current-condition");
  currentConditionElement.innerHTML = `${currentCondition}`;

  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  let feelsLikeTemperatureElement = document.querySelector(
    "#feels-like-temperature"
  );
  feelsLikeTemperatureElement.innerHTML = `feels like ${feelsLikeTemperature}°C`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = sunriseTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = sunsetTime(response.data.sys.sunset * 1000);

  let updateElement = document.querySelector("#update");
  updateElement.innerHTML = updateTime(response.data.dt * 1000);

  //units convert functions
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElementF = document.querySelector("#temperature");
    temperatureElementF.innerHTML = Math.round((`${temperature}` * 9) / 5 + 32);
  }
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
  }

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
}
//macht mit dem Input oder aktuellem Standort den entsprechenden API Call und gibt es an "showTemperature" weiter
function search(city) {
  let apiKEY = "83d4ec1e65679a00b9602279433dcdb9";
  let apiUnit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?q=${city}&appid=${apiKEY}&units=${apiUnit}`;
  axios.get(`${apiURL}`).then(showTemperature);
}

//eingegebene Location
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  search(city);
}
let cityForm = document.querySelector("#enter-city");
cityForm.addEventListener("submit", handleSubmit);

//aktueller Standort
function showCurrentPosition(position) {
  let latCoord = position.coords.latitude;
  let lonCoord = position.coords.longitude;
  let apiKEY = "83d4ec1e65679a00b9602279433dcdb9";
  let apiUnit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?lat=${latCoord}&lon=${lonCoord}&appid=${apiKEY}&units=${apiUnit}`;

  axios.get(`${apiURL}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//als Default Platzhalter damit die Wetter App nicht leer angezeigt wird
//siehe oben function search(city), display by default
search("Berlin");
