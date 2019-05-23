import { BOOKS_FETCHING, BOOKS_RECEIVED } from '../actions';

const defaultState = {
    books: [],
    received: false,
    fetching: false,
};

export const BooksReducer = (state = defaultState, action) => {
    switch(action.type) {
        case BOOKS_FETCHING: {
            return {
                ...state,
                fetching: true,
            }
        }

        case BOOKS_RECEIVED: {
            const { books } = action;

            return {
                ...state,
                books,
                fetching: false,
                received: true,
            }
        }

        default:
            return state;
    };
};