import Icon from './loading-sun.png';

function createWeatherElement(className,textContent,id=''){
  const weatherElement = document.createElement('div');
  weatherElement.classList.add(className);
  weatherElement.textContent = textContent;
  if (id !== ''){
    weatherElement.id = id;
  }
  return weatherElement;
}

async function createWeatherImageElement(iconID){
  // See https://openweathermap.org/weather-conditions for iconID definition
  try {
    const weatherImageElement = document.createElement('img');
    weatherImageElement.src = 'http://openweathermap.org/img/wn/' + iconID + '@4x.png';
    weatherImageElement.classList.add('current-weather-image');
    await weatherImageElement.decode();
    return weatherImageElement;
  }
  catch (error) {
    console.log('Failed to decode element :' + error);
  }
}

function addToggleButton(parent){
  const toggleLabel = document.createElement('label');
  toggleLabel.classList.add('switch');

  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.id = 'toggle-button';
  toggleInput.checked = unitStandard === 'imperial' ? false : true;
  toggleInput.addEventListener('click',toggleTemperature);

  const toggleSpan = document.createElement('span');
  toggleSpan.classList.add('slider');
  toggleSpan.classList.add('round');

  toggleLabel.appendChild(toggleInput);
  toggleLabel.appendChild(toggleSpan);

  parent.appendChild(toggleLabel);
}

async function getWeatherDataFromCoordinates(cityCoordinates){
  try {
    const apiURL = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + cityCoordinates.lat + '&lon=' + cityCoordinates.lng + '&appid=3a903541094e22847334889d1b06ea95';
    const weatherResponse = await fetch(apiURL, {mode: 'cors'});
    return await weatherResponse.json();
  } catch (error){
    console.log('Failed to get weather data: ' + error);
  }
}

function convertKelvinToFahrenheit(temp){
  return Math.round(temp * (9/5) - 459.67);
}
function convertKelvinToCelsius(temp){
  return Math.round(temp - 273.1);
}
function convertMpsToMph(speed){
  return Math.round(2.23694*speed*10)/10; // 1 decimal place
}
function convertMetersToMiles(distance){
  return Math.round(distance/1000.0/1.609*10)/10; // 1 decimal place
}
function convertMetersToKilometers(distance){
  return Math.round(distance/1000);
}
function displayLoading(){
  const loadingIcon = new Image();
  loadingIcon.src = Icon;
  loadingIcon.classList.add('rotate');
  loadingIcon.style.visibility='visible';
  loadingIcon.id = 'loading-sun';
  document.getElementById('weather-container').appendChild(loadingIcon);
}

let unitStandard = 'imperial' //default units is imperial, other standard is metric.
function toggleTemperature(){
  const toggleButton = document.getElementById('toggle-button');
  const weatherVisibility = document.getElementById('weather-visibility');
  const windSpeed = document.getElementById('wind-speed');
  const weatherDescription = document.getElementById('weather-description');
  unitStandard = toggleButton.checked === true ? 'metric' : 'imperial'; //Swap the standard used.
  const convertTemp = unitStandard === 'imperial' ? convertKelvinToFahrenheit : convertKelvinToCelsius;
  const convertSpeed = unitStandard === 'imperial' ? convertMpsToMph : (mps)=>{return Math.round(mps);};
  const convertVisibility = unitStandard === 'imperial' ? convertMetersToMiles : convertMetersToKilometers;
  const tempUnit = unitStandard === 'imperial' ? ' °F' : ' °C';
  const speedUnit = unitStandard === 'imperial' ? ' mph' : ' mps';
  const distanceUnit = unitStandard === 'imperial' ? ' miles' : ' km';
  const divisor = '\xa0\xa0\xa0|\xa0\xa0\xa0';
  weatherDescription.textContent = convertTemp(storedWeatherData.temperature) + tempUnit + divisor + storedWeatherData.description;
  weatherVisibility.textContent = 'Visibility: ' + convertVisibility(storedWeatherData.visibility) + distanceUnit;
  windSpeed.textContent = 'Wind Speed: ' + convertSpeed(storedWeatherData.windSpeed) + speedUnit;
}

let storedWeatherData = {
  temperature: 0,//Kelvins,
  windSpeed: 0, //mps
  visibility:0,//m
  description: '',
}
async function displayWeatherAutocomplete(autocomplete){
  try {
    displayLoading();
    const weatherData = await getWeatherDataFromCoordinates(autocomplete.latlng);
    const weatherImageElement = await createWeatherImageElement(weatherData.current.weather[0].icon); //Wait for image to load
    const weatherElements = [];
    //Push elements in display order
    const convertTemp = unitStandard === 'imperial' ? convertKelvinToFahrenheit : convertKelvinToCelsius;
    const convertSpeed = unitStandard === 'imperial' ? convertMpsToMph : (mps)=>{return Math.round(mps);};
    const convertVisibility = unitStandard === 'imperial' ? convertMetersToMiles : convertMetersToKilometers;
    const tempUnit = unitStandard === 'imperial' ? ' °F' : ' °C';
    const speedUnit = unitStandard === 'imperial' ? ' mph' : ' mps';
    const distanceUnit = unitStandard === 'imperial' ? ' miles' : ' km';
    storedWeatherData.temperature = weatherData.current.temp;
    storedWeatherData.windSpeed = weatherData.current.wind_speed;
    storedWeatherData.visibility = weatherData.current.visibility;
    storedWeatherData.description = weatherData.current.weather[0].description;
    const cityName = 'city' in autocomplete ? autocomplete.city : autocomplete.name;
    weatherElements.push(createWeatherElement('weather-location', cityName + ', ' + autocomplete.administrative + ', ' + autocomplete.country));
    weatherElements.push(weatherImageElement);
    const divisor = '\xa0\xa0\xa0|\xa0\xa0\xa0';
    weatherElements.push(createWeatherElement('current-weather-description', convertTemp(weatherData.current.temp) + tempUnit + divisor + weatherData.current.weather[0].description,'weather-description'));
    weatherElements.push(createWeatherElement('current-weather-property','Wind Speed: ' + convertSpeed(weatherData.current.wind_speed) + speedUnit,'wind-speed'));
    weatherElements.push(createWeatherElement('current-weather-property','Humidity: ' + weatherData.current.humidity + '%'));
    // weatherElements.push(createWeatherElement('current-weather-property','Dew Point: ' + convertTemp(weatherData.current.dew_point) + ' °F'));
    weatherElements.push(createWeatherElement('current-weather-property','Cloudiness: ' + weatherData.current.clouds + '%'));
    weatherElements.push(createWeatherElement('current-weather-property', 'UVI: ' + weatherData.current.uvi ));
    weatherElements.push(createWeatherElement('current-weather-property', 'Visibility: ' + convertVisibility(weatherData.current.visibility) + distanceUnit,'weather-visibility'));

    //Add created elements to the display
    const weatherContainerElement = document.getElementById('weather-container');
    weatherContainerElement.removeChild(document.getElementById('loading-sun')); //Remove loading image
    for (const weatherElement of weatherElements){
      weatherContainerElement.appendChild(weatherElement);
    }
    addToggleButton(weatherContainerElement);
  }
  catch (error) {
    console.log('Failed to display weather data: ' + error);
  }
}
export default displayWeatherAutocomplete;