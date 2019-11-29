import { LOADING_PROJECTS, PROJECTS_RECEIVED, TOGGLE_SHOW_ADD_PROJECT_MODAL, ACTIVE_PROJECT } from "../types";

const initialState = {
    loading: false,
    projects: {},
    showAddProjectModal: false,
    activeProject: {}
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PROJECTS:
            return {
                ...state,
                loading: true
            };
        case PROJECTS_RECEIVED:
            return {
                ...state,
                projects: action.payload,
                loading: false
            };
        case TOGGLE_SHOW_ADD_PROJECT_MODAL:
            return {
                ...state,
                showAddProjectModal: action.payload
            };
        case ACTIVE_PROJECT:
            return {
                ...state,
                activeProject: action.payload
            }
        default:
            return state;
    }
};

export default projectReducer;