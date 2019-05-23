import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { GET_BOOKS, BOOKS_FETCHING, BooksReceived } from '../actions';
import axios from 'axios';

async function fetchBooks(params = {}) {
    return axios.get('https://www.googleapis.com/books/v1/volumes', { params })
    .then(res => res)
    .catch(err => {
        throw err;
    });
}

function* getBooks(action) {
    yield call(function*() {
        yield put({
            type: BOOKS_FETCHING
        });
    });

    yield delay(200);

    try {
        const { searchValue } = action;
        const {
            status,
            data: {
                items: books = [],
            },
        } = yield call(fetchBooks, { q: searchValue });
        
        if (status === 200) {
            yield put(BooksReceived(books));
        } else {
            //something went wrong ...
            throw new Error('Something went wrong in API');
        }
    } catch(err) {
        //something went wrong ...
    }
}

export function* watchGetBooks() {
    yield takeLatest(GET_BOOKS, getBooks);
}