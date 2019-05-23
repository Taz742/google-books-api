export const GET_BOOKS = 'GET_BOOKS';
export const BOOKS_RECEIVED = 'BOOKS_RECEIVED';
export const BOOKS_FETCHING = 'BOOKS_FETCHING';

export const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';
export const SINGLE_BOOK_RECEIVED = 'SINGLE_BOOK_RECEIVED';
export const SINGLE_BOOK_FETCHING = 'SINGLE_BOOK_FETCHING';

export const ADD_OR_REMOVE_FAVORITE_BOOK = 'ADD_OR_REMOVE_FAVORITE_BOOK';

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

export const GetBookDetail = (id) => {
    return {
        type: GET_SINGLE_BOOK,
        id
    }
};

export const SingleBookReceived = (book) => {
    return {
        type: SINGLE_BOOK_RECEIVED,
        book
    }
};

export const AddOrRemoveFavoriteBook = (book) => {
    return {
        type: ADD_OR_REMOVE_FAVORITE_BOOK,
        book
    }
};