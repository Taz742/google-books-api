import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_BOOKS, BooksReceived } from '../actions';
import axios from 'axios';

async function fetchBooks(params = {}) {
    return axios.get('https://www.googleapis.com/books/v1/volumes', {
        params
    }).then(res => res).catch(err => {
        throw err;
    });
}

function* getBooks(action) {
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