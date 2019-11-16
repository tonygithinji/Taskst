import { USER_LOGGEDIN, USER_LOGGED_OUT } from "../types";
import api from "../../api";

export const userLoggedIn = (data) => {
    return {
        type: USER_LOGGEDIN,
        payload: data
    }
}

export const userLogin = (data) => {
    return (dispatch) => {
        return api.user.login(data).then(res => {
            localStorage.setItem("taskst_token", res.token);
            dispatch(userLoggedIn(res));
        });
    }
}

export const userLoggedOut = () => {
    localStorage.removeItem("taskst_token");

    return {
        type: USER_LOGGED_OUT
    }
}

export const validateToken = (token) => {
    return (dispatch) => {
        return api.user.validateToken(token).then(res => {
            dispatch(userLoggedIn(res));
        });
    }
}