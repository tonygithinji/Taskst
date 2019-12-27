import {
    LOADING_PROJECTS,
    PROJECTS_RECEIVED,
    TOGGLE_SHOW_ADD_PROJECT_MODAL,
    ACTIVE_PROJECT,
    PROJECT_UPDATED,
    DELETE_PROJECT
} from "../types";
import api from "../../api";

export const projectsReceived = (data) => {
    return {
        type: PROJECTS_RECEIVED,
        payload: data
    }
}

export const loadingProjects = () => {
    return {
        type: LOADING_PROJECTS
    }
}

export const fetchProjects = workspaceId => {
    return (dispatch) => {
        dispatch(loadingProjects());
        return api.project.fetchAll(workspaceId);
    }
};

export const addProject = data => {
    return () => {
        return api.project.addProject(data);
    }
};

export const toggleAddProjectModal = toggle => {
    return {
        type: TOGGLE_SHOW_ADD_PROJECT_MODAL,
        payload: toggle
    }
}

export const activateProject = project => {
    return {
        type: ACTIVE_PROJECT,
        payload: project
    }
};

export const updateProject = data => {
    return () => {
        return api.project.updateProject(data)
    }
}

export const projectUpdated = project => {
    return {
        type: PROJECT_UPDATED,
        payload: project
    }
}

export const deleteProjectFromUI = projectId => {
    return {
        type: DELETE_PROJECT,
        payload: projectId
    }
}

export const deleteProject = data => {
    return dispatch => {
        dispatch(deleteProjectFromUI(data.projectId));
        return api.project.deleteProject(data);
    }
}