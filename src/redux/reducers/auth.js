import { USER_LOGGEDIN, USER_LOGGED_OUT } from "../types";

const initialState = {
    user: {},
    token: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGEDIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };

        case USER_LOGGED_OUT:
            return {
                ...state,
                user: {},
                token: ""
            };

        default:
            return state;
    }
}

export default authReducer;