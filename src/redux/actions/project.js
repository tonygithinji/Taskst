import { LOADING_PROJECTS, PROJECTS_RECEIVED, TOGGLE_SHOW_ADD_PROJECT_MODAL } from "../types";
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