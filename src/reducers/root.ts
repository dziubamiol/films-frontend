import { combineReducers } from 'redux';
import auth, { IAuth } from './auth';
import remove, { IDelete } from './delete';
import films, { IFilms } from './films';
import { INotification } from '../actions/notifications';
import notification from './notification';

export interface IRootState {
    auth: IAuth;
    remove: IDelete;
    films: IFilms;
    notification: INotification
}

const rootReducer = combineReducers({
    auth,
    remove,
    films,
    notification
});

export default rootReducer;
