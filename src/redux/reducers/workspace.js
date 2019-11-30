import { LOADING_WORKSPACES, WORKSPACES_RECEIVED, SET_SELECTED_WORKSPACE } from "../types";

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
        default:
            return state;
    }
}

export default workspaceReducer; 