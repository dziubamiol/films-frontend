import { Dispatch } from 'redux';
import * as HTTPStatus from 'http-status-codes';
import { ThunkResult } from './delete';
import { deleteNotification, setNotification } from './notifications';
import { getStatusMessage } from '../misc/StatusMessages';

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

export interface IFilmPayload {
    total: number;
    films: Array<IFilm>
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
    film?: IFilmNormalized,
    total?: number,
    id?: string
};

export interface IAddedFilmPayload {
    id: string;
}

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

export const addFilmToList = (film: IFilmNormalized, id: string): TFilmAction => {
    return {
        type: ADD_FILM,
        film: film,
        id: id,
    }
}

export const stopFetchingFilms = (): TFilmAction => {
    return {
        type: STOP_FETCHING_FILMS
    }
}

export const updateFilms = (films: TFilms, total: number): TFilmAction => {
    return {
        type: UPDATE_FILMS,
        films: films,
        total: total
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

/**
 * @description get films by search query
 */
export const getFilms = (query: IFilmQuery): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    let queryString = '';

    for (const param of Object.keys(query)) {
        console.log(query[param]);
        query[param] !== undefined &&
        query[param] !== ''
        && (queryString += `${param}=${(query[param] as string | number).toString()}&`);
    }

    dispatch(fetchFilms());
    return fetch(`${process.env.REACT_APP_DOMAIN}/films?${queryString}`, {
        credentials: 'include',
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.OK) {
                res.json().then((data: IFilmPayload) => {
                    const filmsMap: TFilms = new Map([]);

                    for (const film of data.films) {
                        const filmNormalized: IFilmNormalized = {
                            id: film._id,
                            releaseYear: film.releaseYear,
                            name: film.name,
                            format: film.format,
                            actors: film.actors,
                        }

                        filmsMap.set(film._id, filmNormalized);
                    }
                    console.log(data.total);
                    dispatch(updateFilms(filmsMap, data.total));
                    dispatch(stopFetchingFilms())
                })
            } else {
                const message = getStatusMessage(res.status);

                dispatch(deleteNotification());
                dispatch(setNotification(message, 'error'));
                dispatch(stopFetchingFilms());
            }
        }).catch();
}


/**
 * @description create film from json
 */
export const addFilm = (film: INewFilm, successAction?: any): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/films/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(film),
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.CREATED) {
                res.json().then((body: IAddedFilmPayload) => {

                    const normalizedFilm: IFilmNormalized = film as IFilmNormalized;
                    normalizedFilm.id = body.id

                    dispatch(addFilmToList(normalizedFilm, body.id));
                    dispatch(deleteNotification());
                    dispatch(setNotification('Created new film', 'success'));
                    successAction && successAction(); // perform action if success
                });
            } else if (res.status === HTTPStatus.NOT_MODIFIED) {
                dispatch(deleteNotification());
                dispatch(setNotification('Film with same name and year already exist', 'warning'));
            } else {
                const message = getStatusMessage(res.status);

                dispatch(deleteNotification());
                dispatch(setNotification(message, 'error'));
            }
        })
}
