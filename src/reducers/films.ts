import {
    TFilms,
    IFilmNormalized,
    TFilmAction,
    FETCH_FILMS,
    UPDATE_FILMS,
    STOP_FETCHING_FILMS,
    DELETE_FILM, ADD_FILM
} from '../actions/films';

export type IFilms = {
    isFetching: boolean;
    films: TFilms;
    total: number;
}

const initState: IFilms = {
    isFetching: false,
    films: new Map<string, IFilmNormalized>([]),
    total: 0
}

const films = (state: IFilms = initState, action: TFilmAction) => {
    switch (action.type) {
        case FETCH_FILMS:
            return {
                ...state,
                films: new Map(state.films),
                isFetching: true,
            };
        case UPDATE_FILMS:
            console.log(action);
            return {
                films: action.films,
                total: action.total,
                isFetching: false,
            };
        case ADD_FILM:
            action.id && action.film && state.films.set(action.id, action.film);
            const newFilms = state.films;
            const totalFilms = state.total + 1;

            return {
                ...state,
                films: new Map(newFilms),
                total: totalFilms
            }
        case STOP_FETCHING_FILMS:
            return {
                ...state,
                films: new Map(state.films),
                isFetching: false
            };
        case DELETE_FILM:
            action.deleteID && state.films.delete(action.deleteID);
            const total = state.total - 1;

            return {
                ...state,
                total,
                films: new Map(state.films),
            }
        default:
            return state;
    }
}

export default films;
