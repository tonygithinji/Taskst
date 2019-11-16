import api from "../../api";
import { userLoggedIn } from "../actions/auth";

const userSignUp = (data) => {
    return (dispatch) => {
        return api.user.register(data).then(res => {
            localStorage.setItem("taskst_token", res.token);
            dispatch(userLoggedIn(res));
        })
    }
}

export default userSignUp;