'use strict';

/* - - - - - - - - - - - - - - - - - - - - - */
/* Utils                                     */
/* - - - - - - - - - - - - - - - - - - - - - */

function select(selector, parent = document) {
    return parent.querySelector(selector);
}
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}


/* - - - - - - - - - - - - - - - - - - - - - */
/* Variable                                  */
/* - - - - - - - - - - - - - - - - - - - - - */

const citiesURL = './assets/script/cities.json';
const moviesURL = './assets/script/movies.json';

const list = select('.movies');
const searchM = select('.searchM');
const searchC = select('.searchC');
const resultM = select('.resultM');
const resultC = select('.resultC');


/* - - - - - - - - - - - - - - - - - - - - - */
/* List                                      */
/* - - - - - - - - - - - - - - - - - - - - - */

function listMovies(array) {
    list.innerHTML = '';
    let movies = '';

    if (array.length > 0) {
        array.forEach(movie => {
            movies += `
            <div class="card"> 
                <div class="poster">
                   <img src= "${movie.img}">
                </div>
                <div class="Mtitle">${movie.title}</div>
            </div>`;
        });
    } else {
        movies = `<div>Something is wrong`;
    }

    list.innerHTML = `${movies}`;
}



/* - - - - - - - - - - - - - - - - - - - - - */
/* Fetch                                     */
/* - - - - - - - - - - - - - - - - - - - - - */

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    mode: 'cors'
}
async function getMovies() {
    try {
        const response = await fetch(moviesURL, options);

        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        listMovies(data.movies);
        searchMovies(data.movies);
    } catch(error) {
        print(error.message);
    }
    
}
async function getCities() {
    try {
        const response = await fetch(citiesURL, options);

        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        searchcities(data.cities);
    } catch(error) {
        print(error.message);
    }
}

getMovies();
getCities();



/* - - - - - - - - - - - - - - - - - - - - - */
/* Search                                    */
/* - - - - - - - - - - - - - - - - - - - - - */

function searchMovies (array) {
    onEvent('input', searchM, () => {
        let searchString = searchM.value.toLowerCase().trim();
        resultM.innerHTML = '';
        let bar = '';
        let num = 0;
        if (searchString.length > 1) {
            array.forEach((movie) => {
                const itemValue = movie.title;
                const title = itemValue.toLowerCase();
                
                if (title.includes(searchString)) {
                    bar += `<li class="list">${itemValue}</li>`;
                    num ++;
                }
           })
           if (num == 0 ) {
                bar = `<li>Movie not found</li>`;
           }

           resultM.innerHTML = `<ul>${bar}</ul>`;

           listF(searchM, resultM);
        }
    })
    searchM.value = '';
}


function searchcities (array) {
    onEvent('input', searchC, () => {
        let searchString = searchC.value.toLowerCase().trim();
        resultC.innerHTML = '';
        let bar = '';
        let num = 0;

        if (searchString.length > 1) {
            array.forEach((city) => {
                const itemValue = city.name;
                const title = itemValue.toLowerCase();
                if (title.includes(searchString)) {
                    bar += `<li class="list">${itemValue}</li>`;
                    num ++;
                }
           })
           if (num == 0 ) {
                bar = `<li>City not found</li>`;
           }

           resultC.innerHTML = `<ul>${bar}</ul>`;

           listF(searchC, resultC);
        }
    })
    searchC.value = '';
}


/* - - - - - - - - - - - - - - - - - - - - - */
/* Select choice                             */
/* - - - - - - - - - - - - - - - - - - - - - */

function listF(search, result) {
    const li = selectAll('.list');
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener('click', () => {
            search.value = li[i].innerText;
            result.innerHTML = '';
        } )
    }
}







