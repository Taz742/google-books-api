import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_SINGLE_BOOK, SINGLE_BOOK_FETCHING, SingleBookReceived } from '../actions';
import axios from 'axios';

async function fetchBookDetail(id) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(res => res)
    .catch(err => {
        throw err;
    });
}

function* getBookDetail(action) {
    try {
        yield call(function*() {
            yield put({
                type: SINGLE_BOOK_FETCHING
            });
        });

        const { id } = action;
        const {
            status,
            data: bookData
        } = yield call(fetchBookDetail, id);
        
        if (status === 200) {
            yield put(SingleBookReceived(bookData));
        } else {
            //something went wrong ...
            throw new Error('Something went wrong in API');
        }
    } catch(err) {
        //something went wrong ...
    }
}

export function* watchGetSingleBook() {
    yield takeLatest(GET_SINGLE_BOOK, getBookDetail);
}