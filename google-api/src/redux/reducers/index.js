import { combineReducers } from 'redux';
import { BooksReducer } from './books';

const reducers = combineReducers({
    booksReducer: BooksReducer,
});

export default reducers;