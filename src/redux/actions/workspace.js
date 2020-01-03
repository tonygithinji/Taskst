import {
    LOADING_WORKSPACES,
    WORKSPACES_RECEIVED,
    SET_SELECTED_WORKSPACE,
    UPDATE_WORKSPACE_PROJECT_DELETE,
    UPDATE_WORKSPACE_STATS,
    WORKSPACE_UPDATED,

} from "../types";
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

// Updates workspaces after deleting a project
export const updateWorkspaces = deletedProject => {
    return {
        type: UPDATE_WORKSPACE_PROJECT_DELETE,
        payload: deletedProject
    }
}

// Updates selected workspace completed tasks after a task is completed
export const updateWorkspaceStats = task => {
    return {
        type: UPDATE_WORKSPACE_STATS,
        payload: {
            updateCount: task.complete ? 1 : -1
        }
    }
}

export const updateWorkspace = data => {
    return () => {
        return api.workspace.updateWorkspace(data);
    }
}

export const workspaceUpdated = workspace => {
    return {
        type: WORKSPACE_UPDATED,
        payload: workspace
    }
}