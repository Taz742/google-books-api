import { all, fork } from 'redux-saga/effects';
import { watchGetBooks } from './books';
import { watchGetSingleBook } from './book-detail';

export default function* sagas() {
    yield all([
        fork(watchGetBooks),
        fork(watchGetSingleBook),
    ]);
}