import '../css/colors.css';
import '../css/styles.css';


import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country');
const info = document.querySelector('.country-info');

const handleSearchCountry = event => {
  const searchCountry = event.target.value.trim();
  listEl.innerHTML = '';

  if (searchCountry !== '') {
    fetchCountries(searchCountry)
      .then(data => {
        if (2 <= data.length && data.length <= 10) {
          const markup = data
            .map(
              country =>
               `<li class="country-list">
                    <div class="country-img">
                        <img src=${country.flags.png} alt="" width = 80px>
                    </div>
                    <div class="country-content">
                        <h2>${country.name.common}</h2>
                    </div>
                </li>`
            )
            .join('');

          listEl.insertAdjacentHTML('beforeend', markup);
        }
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length === 1) {
          const countryInfo = data
            .map(
              country =>
                `<li class="country-info">
                    <div class="img-text">
                        <img class="country-limg"src=${country.flags.png} width = 80px> 
                        <h2> ${country.name.common} </h2>
                    </div>

                    <p><b>Capital:</b> ${country.capital}</p>
                    <p><b>Population:</b> ${country.population}</p>
                    <p><b>Languages:</b> ${Object.values(country.languages)}</p>
                </li>`
            )
            .join('');

          listEl.insertAdjacentHTML('beforeend', countryInfo);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);





{/*  */}