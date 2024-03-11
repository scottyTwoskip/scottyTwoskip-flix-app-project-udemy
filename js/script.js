const globalState = { currentpage: window.location.pathname }
// console.log(globalState.currentpage)

async function displayPopularMovies() {
    const results = await fetchAPIData('movie/popular')
    console.log(results)
}

//Fetch data from TMDB API
//obviously, this would be in env file for large or deployed project
async function fetchAPIData(endpoint) {
    const API_KEY = '9a72b45c098f6736b49904f23ad34e71'
    const API_URL = 'https://api.themoviedb.org/3/'

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = await response.json()
    return data
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
            break
        case '/tv-details.html':
            console.log('TV Details')
            break
        case '/movies-details.html':
            console.log('Movie Details')
            break
        case '/search.html':
            console.log('Search')
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)