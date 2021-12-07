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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp);
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[dayIndex];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">
                <div class="forecast-date">${formatForecastDay(
                  forecastDay.dt * 1000
                )}</div>
                   <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                  <div class="forecast-temperature">
                    <span class="forecast-temperature-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>/<span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
                  </div>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKEY = "83d4ec1e65679a00b9602279433dcdb9";
  let apiUnit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${apiUnit}&appid=${apiKEY}`;
  axios.get(apiURL).then(showForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  let currentConditionElement = document.querySelector("#current-condition");
  currentConditionElement.innerHTML = response.data.weather[0].main;

  let feelsLikeTemperatureElement = document.querySelector(
    "#feels-like-temperature"
  );
  feelsLikeTemperatureElement.innerHTML = Math.round(
    response.data.main.feels_like
  );

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = sunriseTime(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = sunsetTime(response.data.sys.sunset * 1000);

  let updateElement = document.querySelector("#update");
  updateElement.innerHTML = updateTime(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKEY = "83d4ec1e65679a00b9602279433dcdb9";
  let apiUnit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?q=${city}&appid=${apiKEY}&units=${apiUnit}`;
  axios.get(`${apiURL}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  search(city);
}

let cityForm = document.querySelector("#enter-city");
cityForm.addEventListener("submit", handleSubmit);

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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElementF = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureElementF);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Hamburg");
