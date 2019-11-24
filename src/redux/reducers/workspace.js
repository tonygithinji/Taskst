import { WORKSPACES_RECEIVED, ACTIVATE_WORKSPACE } from "../types";

const initialState = {
    loading: false,
    workspaces: []
}

const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_WORKSPACES":
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
        case ACTIVATE_WORKSPACE:
            return {
                ...state,
                activeWorkspace: action.payload
            }
        default:
            return state;
    }
}

export default workspaceReducer; 