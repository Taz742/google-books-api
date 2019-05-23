import { combineReducers } from 'redux';
import { BooksReducer } from './books';
import { BookDetailReducer } from './book-detail';
import { FavoritesReducer } from './favorites';

const reducers = combineReducers({
    booksReducer: BooksReducer,
    bookDetailReducer: BookDetailReducer,
    favoritesReducer: FavoritesReducer,
});

export default reducers;