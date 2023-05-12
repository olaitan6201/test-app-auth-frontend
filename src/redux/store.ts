import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export function authHeader() {
    // return authorization header with basic auth credentials
    let token = localStorage.getItem('API_TOKEN') || ''
    let auth = {};
    if (token) {
        auth = {
            Authorization: `Bearer ${token}`,
        };
    }
    return auth;
}