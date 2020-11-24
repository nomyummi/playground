import places from '../node_modules/places.js/dist/cdn/places.js';

const placesAutocomplete = places({
  appId: 'plKDA0D43NNZ',
  apiKey: '5a822f8a8aeee5a9a2ccdc13795de762',
  container: document.querySelector('#address-search'),
});

export default placesAutocomplete;
