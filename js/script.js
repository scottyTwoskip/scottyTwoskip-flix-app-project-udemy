const globalState = { currentpage: window.location.pathname }
// console.log(globalState.currentpage)

async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular')

    results.forEach(movie => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? `          <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` : `          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
            }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
`;

        document.querySelector('#popular-movies').appendChild(div)
    })
}

//display 20 most popular tv shows
async function displayPopularTvShows() {
    const { results } = await fetchAPIData('tv/popular')

    results.forEach(show => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
            ${show.poster_path
                ? `          <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : `          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
            }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
`;

        document.querySelector('#popular-shows').appendChild(div)
    })
}
// display movie details function
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1]

    const movie = await fetchAPIData(`movie/${movieId}`)

    const div = document.createElement('div')
    div.innerHTML = `<div class="details-top">
          <div>
          ${movie.poster_path
            ? `          <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />` : `          <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
        }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
          ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) =>
            `<span>${company.name}</span>`).join(', ')}</div>
        </div>`

    document.querySelector('#movie-details').appendChild(div)
}

//Fetch data from TMDB API
//obviously, this would be in env file for large or deployed project
async function fetchAPIData(endpoint) {
    const API_KEY = '9a72b45c098f6736b49904f23ad34e71'
    const API_URL = 'https://api.themoviedb.org/3/'

    showSpinner()

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = await response.json()
    hideSpinner()
    return data
}

//spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}


//Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
        if (link.getAttribute('href') === globalState.currentpage) {
            link.classList.add('active')
        }
    })
}

//adds commas to movie info
function addCommasToNumber(number) {
    //got from stack overflow
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
//Init App
function init() {
    switch (globalState.currentpage) {
        case '/':
        case '/index.html':
            console.log('Home')
            displayPopularMovies()
            break
        case '/shows.html':
            console.log('Shows')
            displayPopularTvShows()
            break
        case '/tv-details.html':
            console.log('TV Details')
            break
        case '/movie-details.html':
            console.log('Movie Details')
            displayMovieDetails()
            break
        case '/search.html':
            console.log('Search')
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)