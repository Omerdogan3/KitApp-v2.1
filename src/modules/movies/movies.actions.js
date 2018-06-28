import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';

// GENRES
export function retrieveMoviesGenresSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
		moviesGenres: res.data
	};
}

export function retrieveMoviesGenres() {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
		.then(res => {
			dispatch(retrieveMoviesGenresSuccess(res));
		})
		.catch(error => {
			// console.log(error); //eslint-disable-line
		});
	};
}

// POPULAR
export function retrievePopularBooksSuccess(res) {
	return {
		type: types.RETRIEVE_POPULAR_BOOKS_SUCCESS,
		popularBooks: res.data
	};
}

export function retrievePopularBooks(page) {
	return function (dispatch) {
		return axios.get(`https://kitappapi.herokuapp.com/popular/:`)
		.then(res => {
			dispatch(retrievePopularBooksSuccess(res));
		})
		.catch(error => {
			// console.log('Popular', error); //eslint-disable-line
		});
	};
}

export function retrievePopularAuthorsSuccess(res){
	return {
		type: types.RETRIEVE_POPULAR_AUTHORS_SUCCESS,
		popularAuthors: res.data
	}
}

export function retrievePopularAuthors(page) {
	return function (dispatch) {
		return axios.get(`https://kitappapi.herokuapp.com/popularauthors/:`)
		.then(res => {
			dispatch(retrievePopularAuthorsSuccess(res));
		})
		.catch(error => {
			// console.log('Popular', error); //eslint-disable-line
		});
	};
}

// NOW PLAYING
export function retrieveNowPlayingMoviesSuccess(res) {
	return {
		type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
		nowPlayingMovies: res.data
	};
}

export function retrieveNowPlayingMovies(page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`)
		.then(res => {
			dispatch(retrieveNowPlayingMoviesSuccess(res));
		})
		.catch(error => {
			// console.log('Now Playing', error); //eslint-disable-line
		});
	};
}

// MOVIES LIST
export function retrieveMoviesListSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
		list: res.data
	};
}

export function retrieveMoviesList(type, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`)
		.then(res => {
			dispatch(retrieveMoviesListSuccess(res));
		})
		.catch(error => {
			// console.log('Movies List', error); //eslint-disable-line
		});
	};
}

// SEARCH RESULTS
export function retrieveMoviesSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	};
}



export function retrieveMoviesSearchResults(query, page) {
	return function (dispatch) {
		return axios.get(`${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`)
		.then(res => {
			dispatch(retrieveMoviesSearchResultsSuccess(res));
		})
		.catch(error => {
			console.log('Movies Search Results', error); //eslint-disable-line
		});
	};
}


export function retrieveBooksSearchResultsSuccess(res){
	return {
		type: types.RETRIEVE_BOOKS_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	}
}


export function retrieveBooksSearchResults(query, page) {
	return function (dispatch) {
		return axios.get(`http://kitappapi.herokuapp.com/search/${query}`)
		.then(res => {
			dispatch(retrieveBooksSearchResultsSuccess(res));
		})
		.catch(error => {
			console.log('Books Search Results', error); //eslint-disable-line
		});
	};
}




// MOVIE DETAILS
export function retrieveBookDetailsSuccess(res) {
	return {
		type: types.RETRIEVE_BOOK_DETAILS_SUCCESS,
		details: res.data
	};
}

export function retrieveBookDetails(movieId) {
	return function (dispatch) {
		return axios.get(`https://kitappapi.herokuapp.com/${movieId}`)
		.then(res => {
			dispatch(retrieveBookDetailsSuccess(res));
		})
		.catch(error => {
			// console.log('Movie Details', error); //eslint-disable-line
		});
	};
}

export function retrieveBookPrices(movieId){
	return function (dispatch) {
		return axios.get(`https://kitappapi.herokuapp.com/price/${movieId}`)
		.then(res => {
			dispatch(retrieveBookPricesSuccess(res));
		})
		.catch(error => {
			// console.log('Movie Details', error); //eslint-disable-line
		});
	};
}

export function retrieveBookPricesSuccess(res) {
	return {
		type: types.RETRIEVE_BOOK_PRICES_SUCCESS,
		prices: res.data
	};
}

export function retrieveAuthorBooks(movieId){
	return function (dispatch) {
		return axios.get(`https://kitappapi.herokuapp.com/author/${movieId}`)
		.then(res => {
			dispatch(retrieveAuthorBooksSuccess(res));
		})
		.catch(error => {
			console.log('Author Books', error); //eslint-disable-line
		});
	};
}

export function retrieveAuthorBooksSuccess(res){
	return{
		type: types.RETRIEVE_AUTHOR_BOOKS_SUCCESS,
		authorBooks: res.data
	}
}
