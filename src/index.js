// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchCountries } from './fetchCountries';

// const DEBOUNCE_DELAY = 300;

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(e) {
//   let nameCountry = e.target.value.trim();
//   if (!nameCountry) {
//     return;
//   }

//   fetchCountries(nameCountry)
//     .then(country => {
//       if (country.length > 10) {
//         clearResult();
//         return Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       }
//       if (country.length === 1) {
//         countryList.innerHTML = '';
//         return (countryInfo.innerHTML = onRenderCountry(country));
//       } else if (country.length >= 2 && country.length <= 10) {
//         onRenderCountry(country);
//       }
//       countryInfo.innerHTML = '';
//       countryList.innerHTML = onRenderList(country);
//     })
//     .catch(error => {
//       clearResult();
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       return error;
//     });
// }

// function onRenderList(array) {
//   return array
//     .map(
//       ({ name, flags }) =>
//         `<li class="country-item"><img src="${flags.png}" alt="${name.official}" width='32' height = '20'>
//         <p class="country-text">${name.official}</p></li>`
//     )
//     .join('');
// }

// function onRenderCountry(array) {
//   return array
//     .map(
//       ({ name, capital, population, flags, languages }) =>
//         `<div class = "country-item"><img src="${flags.png}" alt="${
//           name.official
//         }" width='64' height = '40'>
//         <h1 class="country-text">${name.official}</h1></div>
//         <p class="country-text-info">Capital: ${capital}</p>
//         <p class="country-text-info">Population: ${population}</p>
//         <p class="country-text-info">Languages: ${Object.values(languages)} </p>
//         `
//     )
//     .join('');
// }
// function clearResult() {
//   countryInfo.innerHTML = '';
//   countryList.innerHTML = '';
// }

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const nameCountry = searchBox.value.trim();
  if (nameCountry === '') {
    return clearResult();
  }
  fetchCountries(nameCountry)
    .then(country => {
      clearResult();

      if (country.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', onRenderCountry(country));
      } else if (country.length >= 10) {
        alert();
      } else {
        countryList.insertAdjacentHTML('beforeend', onRenderList(country));
      }
    })
    .catch(error);
}

function alert() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function error() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onRenderList(country) {
  const layoutCountryList = country
    .map(({ name, flags }) => {
      const layout = `
          <li class="country-list__item">
              <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
              <h2 class="country-list__item--name">${name.official}</h2>
          </li>
          `;
      return layout;
    })
    .join('');
  return layoutCountryList;
}

function onRenderCountry(country) {
  const layoutCountryInfo = country
    .map(({ name, flags, capital, population, languages }) => {
      const layout = `
        <ul class="country-info__list">
            <li class="country-info__item">
              <img class="country-info__item--flag" src="${
                flags.svg
              }" alt="Flag of ${name.official}">
              <h2 class="country-info__item--name">${name.official}</h2>
            </li>
            <li class="country-info__item"><span class="country-info__item--categories">Capital: </span>${capital}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Population: </span>${population}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Languages: </span>${Object.values(
              languages
            ).join(', ')}</li>
        </ul>
        `;
      return layout;
    })
    .join('');
  return layoutCountryInfo;
}

function clearResult() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
