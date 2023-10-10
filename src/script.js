
let updateDay = document.querySelector("#todayTime");

let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();
updateDay.innerHTML = `${day} ${hour}:${minute}`;



function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city");
let currentCity = document.querySelector("#current-city");



currentCity.innerHTML = (`${inputCity.value}`);

  let cityInput = document.querySelector("#input-group input[type='text']");
  searchCity(cityInput.value);
}

let form = document.querySelector("#input-group");
form.addEventListener("submit", changeCity);



function searchCity(city) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let units = `metric`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function getPosition(position){
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let lat = position.coords.latitude;
 let lon = position.coords.longitude;
 let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}


function showWeather(response){
  let warmTemp = Math.round(response.data.main.temp);
  let newWarmTemp = document.querySelector("#todayWarm");
  newWarmTemp.innerHTML = `${warmTemp}ºC`;
  

  let coldTemp = Math.round(response.data.main.temp_min);
  let newColdTemp = document.querySelector("#todayCold");
  newColdTemp.innerHTML = `${coldTemp}ºC`;

  let newHumidity = response.data.main.humidity;
let humidity = document.querySelector(".humidity");
humidity.innerHTML = `Humidity: ${newHumidity}%`;

  let newWind = response.data.wind.speed;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${newWind} km/h`;

  let todayWeather = response.data.weather[0].description;
let updateWeather = document.querySelector(".todayWeather");
const str = todayWeather;
let result = str.charAt(0).toUpperCase() + str.slice(1);
updateWeather.innerHTML = `${result}`;

let currentCity = response.data.name;
let updateCurrentCity= document.querySelector("#current-city");
updateCurrentCity.innerHTML = `${currentCity}`;
console.log(response.data);

}


function getLocation(event) {
 event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}



let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", getLocation);


