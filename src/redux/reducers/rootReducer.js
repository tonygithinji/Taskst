import { combineReducers } from "redux";
import authReducer from "./auth";
import workspaceReducer from "./workspace";

const reducer = combineReducers({
    auth: authReducer,
    workspace: workspaceReducer
});

export default reducer;