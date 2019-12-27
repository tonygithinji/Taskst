import {
    LOADING_PROJECTS,
    PROJECTS_RECEIVED,
    TOGGLE_SHOW_ADD_PROJECT_MODAL,
    ACTIVE_PROJECT,
    PROJECT_UPDATED,
    DELETE_PROJECT
} from "../types";

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
            }
        case PROJECTS_RECEIVED:
            return {
                ...state,
                projects: action.payload,
                loading: false
            }
        case TOGGLE_SHOW_ADD_PROJECT_MODAL:
            return {
                ...state,
                showAddProjectModal: action.payload
            }
        case ACTIVE_PROJECT:
            return {
                ...state,
                activeProject: action.payload
            }
        case PROJECT_UPDATED:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.payload._id]: action.payload
                }
            }
        case DELETE_PROJECT:
            // eslint-disable-next-line no-case-declarations
            const data = { ...state.projects };
            delete data[action.payload];
            return {
                ...state,
                projects: data
            }
        default:
            return state;
    }
};

export default projectReducer;