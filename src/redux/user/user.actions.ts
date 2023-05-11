import { User } from "../types";
import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user : User) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});