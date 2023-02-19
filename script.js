//getting an element from the page

const countriesElem = document.querySelector('.countries');
const dropDown = document.querySelector('.drop-down');
const dropElem = document.querySelector('.drop');
const region = document.querySelectorAll('.drop-text');
const search = document.querySelector('.search');
const toggle = document.querySelector('.toggle');

//getting an array

async function getCountry() {
  const url = await fetch('https://restcountries.com/v3.1/all');
  const res = await url.json();
  console.log(res);
  res.forEach(element => {
    showCountry(element)
  })
}

getCountry()

//render

function showCountry(data) {
  const country = document.createElement('div');
  country.classList.add('country');
  country.innerHTML = `<div class="country-img">
  <img class="img" src="${data.flags.png}" alt="">
</div>
<div class="country-info">
  <h2 class="country-title">${data.name.common}:</h2>
  <p class="country-text"><strong>Population:</strong> ${data.population}</p>
  <p class="country-text country-region"><strong>Region:</strong> ${data.region}</p>
  <p class="country-text"><strong>Capital:</strong> ${data.capital}</p>
</div>`
  countriesElem.appendChild(country);
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

//search

search.addEventListener('input', () => {
  console.log(search.value.toLowerCase());
  Array.from(countryName).forEach(elem => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = 'grid';
    } else {
      elem.parentElement.parentElement.style.display = 'none';
    }
  });
});

//dark mode

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
})
