import './style.css';
import './normalize.css';
import placesAutocomplete from './address-autocomplete.js';
import displayWeatherAutocomplete from './weather-display.js';

function clearDisplay(){
  const node = document.getElementById('weather-container');
  node.innerHTML = "";
}

let autocomplete;
let newAutocomplete;
placesAutocomplete.on('change', (e) => {
  autocomplete = e.suggestion;
  newAutocomplete = true;
})

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click',()=>{
  // If the search value hasn't changed, do nothing
  if (newAutocomplete === true){
    clearDisplay();
    displayWeatherAutocomplete(autocomplete);
    newAutocomplete = false;
  }
});



