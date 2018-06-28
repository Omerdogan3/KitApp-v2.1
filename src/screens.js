/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Movies from './modules/movies/Movies';
import PopularAuthors from './modules/movies/PopularAuthors';
import PopularBooks from './modules/movies/PopularBooks';
import AuthorBooks from './modules/movies/AuthorBooks';
import Movie from './modules/movies/Movie';
import Search from './modules/movies/Search';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Movie', () => Movie, store, Provider);
	Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
	Navigation.registerComponent('movieapp.PopularBooks', () => PopularBooks, store, Provider);
	Navigation.registerComponent('movieapp.PopularAuthors', () => PopularAuthors, store, Provider);
	Navigation.registerComponent('movieapp.AuthorBooks', () => AuthorBooks, store, Provider);
	Navigation.registerComponent('movieapp.Search', () => Search, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
