import {
    TFilms,
    IFilmNormalized,
    TFilmAction,
    FETCH_FILMS,
    UPDATE_FILMS,
    STOP_FETCHING_FILMS,
    DELETE_FILM
} from '../actions/films';

export type IFilms = {
    isFetching: boolean;
    films: TFilms;
}

const initState: IFilms = {
    isFetching: false,
    films: new Map<string, IFilmNormalized>([])
}

const films = (state: IFilms = initState, action: TFilmAction) => {
    switch (action.type) {
        case FETCH_FILMS:
            return {
                films: new Map(state.films),
                isFetching: true
            };
        case UPDATE_FILMS:
            return {
                films: action.films,
                isFetching: false
            };
        case STOP_FETCHING_FILMS:
            return {
                films: new Map(state.films),
                isFetching: false
            };
        case DELETE_FILM:
            action.deleteID && state.films.delete(action.deleteID);

            return {
                ...state,
                films: new Map(state.films),
            }
        default:
            return state;
    }
}

export default films;
