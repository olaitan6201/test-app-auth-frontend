import { Action } from "../types";
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action : Action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;