
export const initialState = {
    user: null,
    favourites: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "ADD":
            return {
                ...state,
                favourites: [...state.favourites, action.movie],
            };
        case "REMOVE":
            return {
                ...state,
                favourites: state.favourites.filter(movie => movie.id !== action.id),
            };
        default:
            return state;
    }
};

export default reducer;