import { SINGLE_BOOK_RECEIVED, SINGLE_BOOK_FETCHING } from '../actions';

const defaultState = {
    book: {},
    fetching: false,
    received: false,
};

export const BookDetailReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SINGLE_BOOK_FETCHING: {
            return {
                ...defaultState,
                fetching: true,
            }
        }

        case SINGLE_BOOK_RECEIVED: {
            const { book } = action;

            return {
                ...state,
                book,
                fetching: false,
                received: true,
            }
        }

        default:
            return state;
    }
};