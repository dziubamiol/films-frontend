import { DELETE_ON, DELETE_OFF, TDeleteAction, DELETE_SET_MESSAGE, DELETE_UNSET_MESSAGE } from '../actions/delete';

export type IDelete = {
    deletable: boolean;
    has_message: boolean;
    delete_message: string;
}

const initState: IDelete = {
    deletable: false,
    has_message: false,
    delete_message: '',
}

const remove = (state: IDelete = initState, action: TDeleteAction) => {
    switch (action.type) {
        case DELETE_ON:
            return {
                ...state,
                deletable: true
            }
        case DELETE_OFF:
            return {
                ...state,
                deletable: false
            }
        case DELETE_SET_MESSAGE:
            return {
                ...state,
                has_message: true,
                delete_message: action.message,
            }
        case DELETE_UNSET_MESSAGE:
            return {
                ...state,
                has_message: false,
                delete_message: '',
            }
        default:
            return state;
    }
}

export default remove;
