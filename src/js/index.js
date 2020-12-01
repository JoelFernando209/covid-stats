import '../sass/main.scss';

import { setFetch, validateStr } from './helpers/asyncHelpers.js';
import { SetDesc } from './dom/setDesc.js';
import { drawBasic, getDaysArray, getDates, filterObj, fetchInfo } from './dom/setChart.js';
import { setEventResults } from './dom/setSearchResults.js';
import { countryNames } from './resources/countryNames.data.js';

const SetDescObj = new SetDesc();

// DOM SELECTORS

const graphicLoading1 = document.querySelector('.graphic__loading--1');
const graphicLoading2 = document.querySelector('.graphic__loading--2');

const graphicInfections = document.querySelector('.graphic__table--infections');
const graphicDeaths = document.querySelector('.graphic__table--deaths')

const mainUbication = document.querySelectorAll('.main__title-ubication');

export const graphicSelected = document.querySelectorAll('.graphic__selected');
const graphicSelectInfections = document.querySelector('.graphic__selected--infections');
const graphicSelectDeaths = document.querySelector('.graphic__selected--deaths');

const graphicsOptionsInfections = document.querySelector('.graphic__options--infections');
const graphicsOptionsDeaths = document.querySelector('.graphic__options--deaths');

const graphicSearchBtnInfections = document.querySelector('.graphic__search-btn--infections');
const graphicSearchBtnDeaths = document.querySelector('.graphic__search-btn--deaths');

const graphicSearchInputInfections = document.querySelector('.graphic__search-input--infections');
const graphicSearchInputDeaths = document.querySelector('.graphic__search-input--deaths');

const graphicOptionsCountriesInfections = document.querySelector('.graphic__options-countries--infections');
const graphicOptionsCountriesDeaths = document.querySelector('.graphic__options-countries--deaths');

// DOM MANIPULATION

export const setGraphicOptionsEvent = (select, options) => {
  let handler = false;
  
  select.addEventListener('click', () => {
    if(handler === false) {
      
      handler = true;
      options.style.display = 'grid';
    } else {
      handler = false;
      options.style.display = 'none';
    }
  })
}

setGraphicOptionsEvent(graphicSelectInfections, graphicsOptionsInfections);
setGraphicOptionsEvent(graphicSelectDeaths, graphicsOptionsDeaths);

const setGraphicSearchBtn = (btn, input, optionsBlock) => {
  btn.addEventListener('click', () => {
    const inputValue = input.value;
  
    if(validateStr(inputValue)) {
      const resultsInfoArr = [];
      
      countryNames.forEach(country => {
        if(country.nameLowerCase.includes(inputValue)) {
          resultsInfoArr.push({ name: country.name, alphaCode: country.alpha2Code});
        }
      })
      
      optionsBlock.innerHTML = '';
      
      resultsInfoArr.forEach(el => {
        const parent = optionsBlock;
  
        const divParentOption = document.createElement('div');
        divParentOption.className = 'graphic__option';
        divParentOption.setAttribute('data-name', el.name);
        
        const imgFlag = document.createElement('img');
        imgFlag.className = 'graphic__option-img';
        imgFlag.setAttribute('src', `https://www.countryflags.io/${el.alphaCode.toLowerCase()}/flat/32.png`);
  
        const nameSpan = document.createElement('span');
        const nameText = document.createTextNode(el.name);
        nameSpan.className = 'graphic__option-name';
        nameSpan.appendChild(nameText);
        
        divParentOption.appendChild(imgFlag);
        divParentOption.appendChild(nameSpan);
        
        setEventResults(divParentOption);
        
        parent.appendChild(divParentOption);
      })
    }
  })
}

setGraphicSearchBtn(graphicSearchBtnInfections, graphicSearchInputInfections, graphicOptionsCountriesInfections);

setGraphicSearchBtn(graphicSearchBtnDeaths, graphicSearchInputDeaths, graphicOptionsCountriesDeaths);

const setMainDesc = (obj) => {
  const mainDesc = document.querySelectorAll('.main__desc');
  
  mainDesc.forEach(el => {
    const parentClass = SetDescObj.getParentClass(el).split(' ')[1];
    const identifyClass = SetDescObj.identifyClass(
    [
      'main__item--infections',
      'main__item--active-infections',
      'main__item--deaths',
      'main__item--new-deaths'
    ], parentClass);
    
    const getTextClass = SetDescObj.getTextClass(identifyClass, obj);
    
    const textClass = document.createTextNode(getTextClass.toLocaleString());
    
    el.appendChild(textClass);
  })
}

let totalInfoObj = setFetch("https://api.covid19api.com/summary").then(data => totalInfoObj = data).then(() => setMainDesc(totalInfoObj));

export const setMainUbication = (ubication) => {
  mainUbication.forEach(el => {
    el.innerHTML = `(${ubication})`;
  })
}

const loadCharts = (title, target, arr) => {
  google.charts.load('current', {packages: ['corechart', 'line']});
  
  google.charts.setOnLoadCallback(drawBasic(title, target, arr));
}

export const loadChartsFunc = (obj) => {
  const infectionsPerDay = filterObj(obj.reverse(), 'new_confirmed');
  const deathsPerDay = filterObj(obj, 'new_deaths');
  loadCharts('Infections', graphicInfections, infectionsPerDay);
  loadCharts('Deaths', graphicDeaths, deathsPerDay);
};

let worldData = setFetch('https://corona-api.com/timeline')
                .then(data => worldData = data)
                .then(() => loadChartsFunc(worldData.data))
                .then(() => setMainUbication('World'));