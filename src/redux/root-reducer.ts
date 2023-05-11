import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    toastr: toastrReducer
});

export default persistReducer(persistConfig, rootReducer);