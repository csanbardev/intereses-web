/* ----- ID list ------ */

const apiKeyV3 = '0e4cfc04d479a7dbfbe343c84f70e32d';
const apiKeyV4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTRjZmMwNGQ0NzlhN2RiZmJlMzQzYzg0ZjcwZTMyZCIsInN1YiI6IjYyYjU5Mzk5MzgzZGYyMDA4YmY4OGM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NikPRdHRpEtKd7v-LktGCaQq96Q5p57aItRUjJUmTS0'
const sessionId = '2c0dcd7e821582961c2aed98d9ff4ffc91e5815c';
const testListId = '8208179'
const movieListId = '8209603'
const serieListId = '8209604'
const animeListId = '8209602'


/* ------- Variables and Constants ------- */
let maxDisplay = 5 // define how many movies or series will be desplayed from total (default: 5; max: 10)
let showAllMovies = false // define that loadData won't show all movies by default
let showAllSeries = false
let showAllAnimes = false
let actualMoviePage = 1 // default value
let actualSeriePage = 1 // default value
let actualAnimePage = 1 // default value

let begin = 0 // first 0, then 10, then...
let totalMoviePages = 1
let totalSeriePages = 1
let totalAnimePages = 1

const movieSection = document.querySelector('#film-title')
const serieSection = document.querySelector('#serie-title')
const animeSection = document.querySelector('#anime-title')



// buttons
const showMovies = document.getElementById('show-movies')
const nextMovie = document.getElementById('btn-mv-next')
const beforeMovie = document.querySelector('#btn-mv-before')
nextMovie.classList.add("hidden")
beforeMovie.classList.add("hidden")

const showSeries = document.querySelector('#show-series')
const nextSerie = document.getElementById('btn-sr-next')
const beforeSerie = document.querySelector('#btn-sr-before')
nextSerie.classList.add("hidden")
beforeSerie.classList.add("hidden")

const showAnimes = document.getElementById('show-animes')
const nextAnime = document.getElementById('btn-an-next')
const beforeAnime = document.querySelector('#btn-an-before')
nextAnime.classList.add("hidden")
beforeAnime.classList.add("hidden")





// LISTENERS
showMovies.addEventListener('click', () => {
    showAllMovies = true
    if (totalMoviePages > 1) {
        nextMovie.classList.remove("hidden")
    }
    scrollTop(movieSection);
    loadData(movieListId, 'movie', 10)
})

nextMovie.addEventListener('click', () => {
    begin += 10
    maxDisplay += 10
    actualMoviePage++;
    if (actualMoviePage === totalMoviePages) {
        nextMovie.classList.add("hidden")
    }
    if (actualMoviePage != 1) {
        beforeMovie.classList.remove("hidden")
    }

    scrollTop(movieSection);

    loadData(movieListId, 'movie', 10)


})

beforeMovie.addEventListener('click', () => {
    begin -= 10
    maxDisplay -= 10
    actualMoviePage--;
    if (actualMoviePage === 1) {
        beforeMovie.classList.add("hidden")
    }
    if (actualMoviePage != totalMoviePages) {
        nextMovie.classList.remove("hidden")
    }
    scrollTop(movieSection);

    loadData(movieListId, 'movie', 10)
})


showSeries.addEventListener('click', () => {
    showAllSeries = true
    if (totalSeriePages > 1) {
        nextSerie.classList.remove("hidden")
    }
    scrollTop(serieSection);
    loadData(serieListId, 'serie', 10)
})

nextSerie.addEventListener('click', () => {
    begin += 10
    maxDisplay += 10
    actualSeriePage++;
    if (actualSeriePage === totalSeriePages) {
        nextSerie.classList.add("hidden")
    }
    if (actualSeriePage != 1) {
        beforeSerie.classList.remove("hidden")
    }

    scrollTop(serieSection);

    loadData(serieListId, 'serie', 10)


})

beforeSerie.addEventListener('click', () => {
    begin -= 10
    maxDisplay -= 10
    actualSeriePage--;
    if (actualSeriePage === 1) {
        beforeSerie.classList.add("hidden")
    }
    if (actualSeriePage != totalSeriePages) {
        nextSerie.classList.remove("hidden")
    }
    scrollTop(serieSection);

    loadData(serieListId, 'serie', 10)
})


showAnimes.addEventListener('click', () => {
    showAllAnimes = true
    if (totalAnimePages > 1) {
        nextAnime.classList.remove("hidden")
    }

    scrollTop(animeSection);
    loadData(animeListId, 'anime', 10)
})

nextAnime.addEventListener('click', () => {
    begin += 10
    maxDisplay += 10
    actualAnimePage++;
    if (actualAnimePage === totalAnimePages) {
        nextAnime.classList.add("hidden")
    }
    if (actualAnimePage != 1) {
        beforeAnime.classList.remove("hidden")
    }

    scrollTop(animeSection);

    loadData(animeListId, 'anime', 10)


})

beforeAnime.addEventListener('click', () => {
    begin -= 10
    maxDisplay -= 10
    actualAnimePage--;
    if (actualAnimePage === 1) {
        beforeAnime.classList.add("hidden")
    }
    if (actualAnimePage != totalAnimePages) {
        nextAnime.classList.remove("hidden")
    }
    scrollTop(animeSection);

    loadData(animeListId, 'anime', 10)
})



// Algorithm


const getTotalPages = (array) => {
    return Math.ceil(array.length / 10)
}



const loadData = async (listId, kind, maxDisplay) => {

    const url = `https://api.themoviedb.org/4/list/${listId}?language=es-ES&api_key=${apiKeyV3}`
    const res = await fetch(url);
    const data = await res.json()
    let films = ''
    let array = []



    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].title == undefined) {
            array.push(`
                <article class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="Poster de la peli ${data.results[i].name}" class="card-image">
                    <h3 class="card-title">${data.results[i].name}</h3>
                </article>
                `)
        } else {
            array.push(`
                <article class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="Poster de la peli ${data.results[i].title}" class="card-image">
                    <h3 class="card-title">${data.results[i].title}</h3>
                </article>
                `)
        }

    }

    if(kind=='movie'){
        totalMoviePages = getTotalPages(array)
    }else if(kind == 'serie'){
        totalSeriePages = getTotalPages(array)
    }else if(kind == 'anime'){
        totalAnimePages = getTotalPages(array)
    }
    
    


    if (showAllMovies || showAllSeries || showAllAnimes) {

        if (kind === 'movie') {
            showMovies.remove()
        } else if (kind === 'serie') {
            showSeries.remove()
        }else if(kind === 'anime'){
            showAnimes.remove()
        }


        if (totalMoviePages > 1 || totalSeriePages > 1 || totalAnimePages > 1) {

            for (let i = begin; i < maxDisplay+begin && i < array.length; i++) {
                films += array[i]
            }

        } else {
            array.forEach(film => {
                films += film
            })
        }
    } else {
        for (let i = 0; i < maxDisplay && i < array.length; i++) {
            films += array[i]
        }
        // maxDisplay = 10
    }

    

    if (kind === 'movie') {
        document.getElementById('films').innerHTML = films;
        if(array.length <= 5){
            showMovies.remove()
        }

    } else if (kind === 'serie') {
        document.querySelector('#series').innerHTML = films;
        if(array.length <= 5){
            showSeries.remove()
        }

    }else if(kind == 'anime'){
        document.querySelector('#animes').innerHTML = films
        if(array.length <= 5){
            showAnimes.remove()
        }
    }

}
loadData(movieListId, 'movie', 5)
loadData(serieListId, 'serie', 5)
loadData(animeListId, 'anime', 5)




const scrollTop = (section) => {
    window.scroll({
        top: section.offsetTop,
        behavior: 'smooth'
    });
    
}

