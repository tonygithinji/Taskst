import { combineReducers } from "redux";
import authReducer from "./auth";
import workspaceReducer from "./workspace";
import projectReducer from "./project";

const reducer = combineReducers({
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer
});

export default reducer;