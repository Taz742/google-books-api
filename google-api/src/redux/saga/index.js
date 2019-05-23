import { all, fork } from 'redux-saga/effects';
import { watchGetBooks } from './books';

export default function* sagas() {
    yield all([
        fork(watchGetBooks),
    ]);
}