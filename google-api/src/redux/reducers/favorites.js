import { ADD_OR_REMOVE_FAVORITE_BOOK } from '../actions';

const defaultState = {
    favorites: []
};

export const FavoritesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_OR_REMOVE_FAVORITE_BOOK: {
            const { book } = action;
            let { favorites } = state;

            const find = state.favorites.find((book_) => book_.id === book.id);

            if (find) {
                favorites = favorites.filter((book_) => book_.id !== book.id);
            } else {
                favorites.push(book);
            }

            return {
                ...state,
                favorites
            }
        }

        default:
            return state;
    }
};