import { AUTH_ERRORED, AUTH_OK, INVALIDATE_SESSION, TAuthAction, VALIDATE_SESSION } from '../actions/auth';

export type IAuth = {
    auth: boolean;
    auth_errored: boolean;
    auth_message: string;
};

const initState: IAuth = {
    auth: false,
    auth_errored: false,
    auth_message: ''
};

const auth = (state: IAuth = initState, action: TAuthAction) => {
    switch (action.type) {
        case VALIDATE_SESSION:
            return {
                ...state,
                auth: true
            };
        case INVALIDATE_SESSION:
            return {
                ...state,
                auth: false,
            };
        case AUTH_ERRORED:
            return {
                auth_message: action.message,
                auth_errored: true,
                auth: false
            }
        case AUTH_OK:
            return {
                ...state,
                auth_errored: false,
                auth_message: ''
            }
        default:
            return state;
    }
}

export default auth;
