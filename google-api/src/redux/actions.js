export const GET_BOOKS = 'GET_BOOKS';
export const BOOKS_RECEIVED = 'BOOKS_RECEIVED';
export const BOOKS_FETCHING = 'BOOKS_FETCHING';

export const GetBooks = (searchValue) => {
    return {
        type: GET_BOOKS,
        searchValue
    }
};

export const BooksReceived = (books) => {
    return {
        type: BOOKS_RECEIVED,
        books
    }
};