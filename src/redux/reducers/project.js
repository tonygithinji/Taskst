import { LOADING_PROJECTS, PROJECTS_RECEIVED, TOGGLE_SHOW_ADD_PROJECT_MODAL } from "../types";

const initialState = {
    loading: false,
    projects: {},
    showAddProjectModal: false
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PROJECTS:
            return {
                ...state,
                loading: true
            };
        case TOGGLE_SHOW_ADD_PROJECT_MODAL:
            return {
                ...state,
                showAddProjectModal: action.payload
            };
        default:
            return state;
    }
};

export default projectReducer;