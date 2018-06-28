import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.movies, action) {
	switch (action.type) {

		case types.RETRIEVE_POPULAR_BOOKS_SUCCESS:
			return {
				...state,
				popularBooks: action.popularBooks
			};

		case types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS:
			return {
				...state,
				nowPlayingMovies: action.nowPlayingMovies
			};

		case types.RETRIEVE_MOVIES_GENRES_SUCCESS:
			return {
				...state,
				genres: action.moviesGenres
			};

		case types.RETRIEVE_MOVIES_LIST_SUCCESS:
			return {
				...state,
				list: action.list
			};

		case types.RETRIEVE_BOOK_DETAILS_SUCCESS:
			return {
				...state,
				details: action.details
			};

		case types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};

		case types.RETRIEVE_BOOKS_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};

		case types.RETRIEVE_BOOK_PRICES_SUCCESS:
			return {
				...state,
				prices: action.prices
			};

		case types.RETRIEVE_AUTHOR_BOOKS_SUCCESS:
			return {
				...state,
				authorBooks: action.authorBooks
			};

		case types.RETRIEVE_POPULAR_AUTHORS_SUCCESS:
			return {
				...state,
				popularAuthors: action.popularAuthors
			}
		default:
			return state;
	}
}
