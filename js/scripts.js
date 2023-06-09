//Variaveis e seleção de elementos 
const apikey = "306d8c4964ab886bc9513606ab61180b";
const apiCountryURL = "https://flagsapi.com/";
const apiCountryURLend = "/flat/32.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span"); 

const weatherContainer = document.querySelector("#weather-data");

//Funções
const getWeatherData = async(city) => {
  const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apikey+ '&lang=pt';
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
}
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  
  cityElement.innerText = data.name;
  tempElement.innerText = data.main.temp;
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src",'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
  countryElement.setAttribute("src", apiCountryURL + data.sys.country + apiCountryURLend);
  humidityElement.innerText = data.main.humidity + "%";
  windElement.innerText = data.wind.speed + "km/h";
  
  weatherContainer.classList.remove("hide");
}


//Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if(e.code === "Enter"){
    const city = e.target.value.trim();
    showWeatherData(city);
  }
});