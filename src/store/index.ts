import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

if (process.env.NODE_ENV === 'development') {
    store.subscribe(() => {
        console.log(store.getState());
    })
}

export default store;
