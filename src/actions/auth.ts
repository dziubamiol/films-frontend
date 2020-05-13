import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from '../reducers/root';
import * as HTTPStatus from 'http-status-codes';

export const VALIDATE_SESSION = 'VALIDATE_SESSION';
export const INVALIDATE_SESSION = 'INVALIDATE_SESSION';
export const AUTH_ERRORED = 'AUTH_ERRORED';
export const AUTH_OK = 'AUTH_OK';

export type TAuthAction = {
    type: string;
    message?: string;
}

export const validateSession = (): TAuthAction => {
    return {
        type: VALIDATE_SESSION
    }
}

export const invalidateSession = (): TAuthAction => {
    return {
        type: INVALIDATE_SESSION
    }
}

export const erroredAuth = (message: string): TAuthAction => {
    return {
        type: AUTH_ERRORED,
        message: message
    }
}

export const setOKAuth = (): TAuthAction => {
    return {
        type: AUTH_OK
    }
}

const invalidateWithError = (dispatch: any, message: string) => {
    dispatch(setOKAuth());
    dispatch(erroredAuth(message));
    dispatch(invalidateSession());
}

export type ThunkResult<R> = ThunkAction<R, IRootState, undefined, TAuthAction>;

/**
 * @description check user session
 */
export const checkAuth = (): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/user/me`, {
        credentials: 'include'
    })
        .then((res: Response) => {
            if (res.status === HTTPStatus.OK) {
                dispatch(validateSession());
            } else {
                dispatch(invalidateSession());
            }
        });
}

/**
 * @description delete user session
 */
export const logout = (): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/user/logout/`,
        {
            credentials: 'include'
        }
    )
        .then(() => {
            dispatch(invalidateSession());
        });
}


export interface IJoin {
    username: string,
    password: string
}

export interface ILogin extends IJoin {
}

/**
 * @description send credentials and validate
 */
export const login = (credentials: ILogin): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/user/login/`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        }
    ).then((res: Response) => {
        if (res.status === HTTPStatus.OK) {
            dispatch(validateSession());
        } else if (res.status === HTTPStatus.UNAUTHORIZED) {
            invalidateWithError(dispatch, 'Invalid username or password');
        }
    });
}

/**
 * @description send new credentials and validate
 */
export const join = (credentials: IJoin): ThunkResult<Promise<void>> => async (dispatch: Dispatch) => {
    return fetch(`${process.env.REACT_APP_DOMAIN}/user/join`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        }
    ).then((res: Response) => {
        if (res.status === HTTPStatus.CREATED) {
            fetch(`${process.env.REACT_APP_DOMAIN}/user/login/`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials),
                }
            ).then((res: Response) => {
                if (res.status === HTTPStatus.OK) {
                    dispatch(validateSession());
                } else {
                    dispatch(invalidateSession());
                }
            })
        } else if (res.status === HTTPStatus.NOT_MODIFIED) {
            invalidateWithError(dispatch, 'This username already exists');
        } else {
            invalidateWithError(dispatch, `Unknown error, status code: ${res.status}`);
        }
    });
}
