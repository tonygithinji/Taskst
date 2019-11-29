import { combineReducers } from "redux";
import authReducer from "./auth";
import workspaceReducer from "./workspace";
import projectReducer from "./project";
import taskReducer from "./task";

const reducer = combineReducers({
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    task: taskReducer
});

export default reducer;