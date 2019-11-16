import { WORKSPACES_RECEIVED } from "../types";
import api from "../../api";

export const workspacesReceived = (data) => {
    return {
        type: WORKSPACES_RECEIVED,
        payload: data
    }
}

export const loadingWorkspaces = () => {
    return {
        type: "LOADING_WORKSPACES"
    }
}

export const fetchWorkspaces = () => {
    return (dispatch) => {
        dispatch(loadingWorkspaces());
        return api.workspace.fetchAll();
    }
};

export const addWorkspace = (data) => {
    return () => {
        return api.workspace.addWorkspace(data);
    }
};
