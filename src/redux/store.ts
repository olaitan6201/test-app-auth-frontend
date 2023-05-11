import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('userData') || '');
    let auth = null;
    if (user && user.token) {
        auth = { 
            Authorization: `Bearer ${user.token}`, 
            "X-Authorization": user.token
        };
    } else {
        auth = {};
    }
    return auth;
}

export const userData = JSON.parse(localStorage.getItem('userData') || '')
export const user = userData ? userData.user : null;