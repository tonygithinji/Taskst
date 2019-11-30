import { LOADING_WORKSPACES, WORKSPACES_RECEIVED, SET_SELECTED_WORKSPACE } from "../types";
import api from "../../api";

export const workspacesReceived = (data) => {
    return {
        type: WORKSPACES_RECEIVED,
        payload: data
    }
}

export const loadingWorkspaces = () => {
    return {
        type: LOADING_WORKSPACES
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

export const setSelectedWorkspace = workspace => {
    return {
        type: SET_SELECTED_WORKSPACE,
        payload: workspace
    }
};

export const activateWorkspace = workspaceId => {
    return dispatch => {
        return api.workspace.getWorkspace(workspaceId).then(workspace => dispatch(setSelectedWorkspace(workspace)));
    }
};
