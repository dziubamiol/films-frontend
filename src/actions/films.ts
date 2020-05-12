import { Dispatch } from 'redux';
import * as HTTPStatus from 'http-status-codes';
import { ThunkResult } from './delete';
import { deleteNotification, setNotification } from './notifications';

export const UPDATE_FILMS = 'UPDATE_FILMS';
export const FETCH_FILMS = 'FETCH_FILMS';
export const STOP_FETCHING_FILMS = 'STOP_FETCHING_FILMS';
export const DELETE_FILM = 'DELETE_FILM';
export const ADD_FILM = 'ADD_FILM';

export interface IFilm {
    _id: string,
    name: string,
    releaseYear: number,
    format: string,
    actors: Array<string>
}

export interface INewFilm {
    name?: string,
    releaseYear?: number,
    format?: string,
    actors?: Array<string>
}

export interface IFilmNormalized {
    id: string,
    name: string,
    releaseYear: number,
    format: string,
    actors: Array<string>
}

export type TFilmAction = {
    type: string,
    deleteID?: string,
    films?: TFilms,
    film?: INewFilm
};

export type TFilms = Map<string, IFilmNormalized>

export const fetchFilms = (): TFilmAction => {
    return {
        type: FETCH_FILMS
    }
}

export const deleteFilmfromList = (id: string): TFilmAction => {
    return {
        type: DELETE_FILM,
        deleteID: id,
    }
}

export const addFilmToList = (film: INewFilm): TFilmAction => {
    return {
        type: ADD_FILM,
        film: film,
    }
}

export const stopFetchingFilms = (): TFilmAction => {
    return {
        type: STOP_FETCHING_FILMS
    }
}

export const updateFilms = (films: TFilms): TFilmAction => {
    return {
        type: UPDATE_FILMS,
        films: films
    }
}

export interface IFilmQuery {
    id?: string;
    name?: string;
    releaseYear?: string;
    format?: string;
    actor?: string;
    offset: number;
    pageSize: number;
    sort?: 'asc' | 'desc';
    sortField?: 'name' | 'releaseYear';

    [key: string]: string | number | undefined;
}

export const getFilms = (query: IFilmQuery): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    let queryString = '';

    for (const param of Object.keys(query)) {
        query[param] !== undefined && (queryString += `${param}=${(query[param] as string | number).toString()}&`);
    }

    dispatch(fetchFilms());
    return fetch(`${process.env.REACT_APP_DOMAIN}/films?${queryString}`, {
        credentials: 'include',
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.OK) {
                res.json().then((data: Array<IFilm>) => {
                    const filmsMap: TFilms = new Map([]);

                    for (const film of data) {
                        const filmNormalized: IFilmNormalized = {
                            id: film._id,
                            releaseYear: film.releaseYear,
                            name: film.name,
                            format: film.format,
                            actors: film.actors,
                        }

                        filmsMap.set(film._id, filmNormalized);
                    }

                    dispatch(updateFilms(filmsMap));
                    dispatch(stopFetchingFilms())
                })
            } else {
                dispatch(stopFetchingFilms())
            }
        }).catch();
}

export const addFilm = (film: INewFilm): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(film),
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.CREATED) {
                dispatch(deleteNotification());
                dispatch(setNotification('Created new film', 'success'));
            } else if (res.status === HTTPStatus.NOT_MODIFIED) {
                dispatch(deleteNotification());
                dispatch(setNotification('Film with same name and year already exist', 'warning'));
            } else {
                dispatch(deleteNotification());
                dispatch(setNotification(`Unknown error, status: ${res.status}`, 'error'));
            }
        })
}
