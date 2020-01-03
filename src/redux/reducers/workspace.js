import {
    LOADING_WORKSPACES,
    WORKSPACES_RECEIVED,
    SET_SELECTED_WORKSPACE,
    UPDATE_WORKSPACE_PROJECT_DELETE,
    UPDATE_WORKSPACE_STATS,
    WORKSPACE_UPDATED
} from "../types";

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
                        ...state.selectedWorkspace,
                        projectsNumber: state.selectedWorkspace.projectsNumber - 1,
                        tasksNumber: state.selectedWorkspace.tasksNumber - action.payload.tasksNumber
                    }
                }
            }
        case UPDATE_WORKSPACE_STATS:
            return {
                ...state,
                selectedWorkspace: {
                    ...state.selectedWorkspace,
                    completedTasks: state.selectedWorkspace.completedTasks + (action.payload.updateCount)
                }
            }
        case WORKSPACE_UPDATED:
            return {
                ...state,
                workspaces: {
                    ...state.workspaces,
                    [action.payload._id]: action.payload
                }
            }
        default:
            return state;
    }
}

export default workspaceReducer; 