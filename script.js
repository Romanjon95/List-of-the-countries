//getting an element from the page

const countriesElem = document.querySelector('.countries');
const dropDown = document.querySelector('.drop-down');
const dropElem = document.querySelector('.drop');
const region = document.querySelectorAll('.drop-text');
const searchInput = document.querySelector('.search');
const searchBtn = document.querySelector('.click');
const toggle = document.querySelector('.toggle');

//first request

fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => displayCountries(data));

searchBtn.addEventListener('click', () => {
  let countryName = searchInput.value;
  const url = Boolean(countryName.trim())
  ? `https://restcountries.com/v3.1/name/${countryName}`
  : 'https://restcountries.com/v3.1/all';
  fetch(url)
    .then(response => response.json())
    .then(data => displayCountries(data));
});

//keypress

searchInput.addEventListener('keypress', (e) => {
  if(e.keyCode === 13) {
    searchBtn.click();
  }
})

const displayCountries = (data) => {
  countriesElem.innerHTML = '';
  data.forEach(country => {
    const div = document.createElement('div');
    div.className = 'country';
    div.innerHTML = `<div class="country-img">
       <img class="img" src="${country.flags.png}" alt="">
     </div>
     <div class="country-info">
       <h2 class="country-title">${country.name.common}:</h2>
       <p class="country-text"><strong>Population:</strong> ${country.population}</p>
       <p class="country-text country-region"><strong>Region:</strong> ${country.region}</p>
       <p class="country-text"><strong>Capital:</strong> ${country.capital}</p>
     </div>`;
    countriesElem.appendChild(div);
  })
}

dropDown.addEventListener('click', () => {
  dropElem.classList.toggle('show-drop-down');
  console.log('Heoolo');
})

//filter

const regionName = document.getElementsByClassName('country-region');
const countryName = document.getElementsByClassName('country-title');
region.forEach(element => {
  element.addEventListener('click', () => {
    console.log(element)
    Array.from(regionName).forEach(elem => {
      console.log(elem.innerText);
      if (elem.innerText.includes(element.innerText) || element.innerText === 'All') {
        elem.parentElement.parentElement.style.display = 'grid';
      } else {
        elem.parentElement.parentElement.style.display = 'none';
      }
    });
  })
})

// dark mode

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
})
