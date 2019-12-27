import { LOADING_WORKSPACES, WORKSPACES_RECEIVED, SET_SELECTED_WORKSPACE, UPDATE_WORKSPACE_PROJECT_DELETE } from "../types";

const initialState = {
    loading: false,
    workspaces: {},
    selectedWorkspace: {}
}

const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_WORKSPACES:
            return {
                ...state,
                loading: true
            }
        case WORKSPACES_RECEIVED:
            return {
                ...state,
                workspaces: action.payload,
                loading: false
            }
        case SET_SELECTED_WORKSPACE:
            return {
                ...state,
                selectedWorkspace: action.payload
            }
        case UPDATE_WORKSPACE_PROJECT_DELETE:
            return {
                ...state,
                selectedWorkspace: {
                    ...state.selectedWorkspace,
                    projectsNumber: state.selectedWorkspace.projectsNumber - 1,
                    tasksNumber: state.selectedWorkspace.tasksNumber - action.payload.tasksNumber
                },
                workspaces: {
                    ...state.workspaces,
                    [action.payload.workspaceId]: {
                        ...state.workspaces[action.payload.workspaceId],
                        projectsNumber: state.selectedWorkspace.projectsNumber - 1,
                        tasksNumber: state.selectedWorkspace.tasksNumber - action.payload.tasksNumber
                    }
                }
            }
        default:
            return state;
    }
}

export default workspaceReducer; 