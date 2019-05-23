import { takeLatest } from 'redux-saga/effects';
import { GET_BOOKS } from '../actions';

function* getBooks(action) {
    console.log('getBooks', action);
}

export function* watchGetBooks() {
    yield takeLatest(GET_BOOKS, getBooks);
}