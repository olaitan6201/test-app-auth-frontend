import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

const uData = localStorage.getItem('userData')

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = uData && JSON.parse(uData);
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

export const userData = uData && JSON.parse(uData)
export const user = userData ? userData.user : null;