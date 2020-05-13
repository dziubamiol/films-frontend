import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../reducers/root';
import * as HTTPStatus from 'http-status-codes';

export const DELETE_ON = 'DELETE_ON';
export const DELETE_OFF = 'DELETE_OFF';
export const DELETE_SET_MESSAGE = 'DELETE_SET_MESSAGE';
export const DELETE_UNSET_MESSAGE = 'DELETE_DELETE_MESSAGE ';

export type TDeleteAction = {
    type: string;
    message?: string;
}

export const turnDeleteOn = (): TDeleteAction => {
    return {
        type: DELETE_ON
    }
}

export const turnDeleteOff = (): TDeleteAction => {
    return {
        type: DELETE_OFF
    }
}

export const deleteMessage = (message: string): TDeleteAction => {
    return {
        type: DELETE_UNSET_MESSAGE,
        message: message
    }
}

export const setMessage = (message: string): TDeleteAction => {
    return {
        type: DELETE_SET_MESSAGE,
        message: message
    }
}

const blinkMessage = (dispatch: any, message: string) => {
    dispatch(setMessage(message));
    setTimeout(() => dispatch(deleteMessage('')), 10000);
}

export type ThunkResult<R> = ThunkAction<R, IRootState, undefined, TDeleteAction>;

/**
 * @description send request to delete film and delete it from the store
 */
export const deleteFilm = (id: string): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/films/remove?id=${id}`, {
        credentials: 'include',
        method: 'DELETE'
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.OK) {
                blinkMessage(dispatch, 'Deleted successfully');
            }
        });
}
