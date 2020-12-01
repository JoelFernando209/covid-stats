import { setFetch } from '../helpers/asyncHelpers.js';
import { countryNames } from '../resources/countryNames.data.js';
import { loadChartsFunc, setMainUbication, graphicSelected, setGraphicOptionsEvent } from '../index.js';


export const changeSelected = countryName => {
  graphicSelected.forEach(el => {
    el.innerHTML = countryName;
  })
}

export const setEventResults = el => {
  el.addEventListener('click', () => {
    const searchName = el.getAttribute('data-name');
    
    const getAlphaCode = countryNames.filter(country => country.name === searchName)[0];
    
    let getDataCountry = setFetch(`https://corona-api.com/countries/${getAlphaCode.alpha2Code}`)
                         .then(data => getDataCountry = data)
                         .then(() => loadChartsFunc(getDataCountry.data.timeline))
                         .then(() => changeSelected(getDataCountry.data.name));
  })
};