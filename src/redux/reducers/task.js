import { LOADING_TASKS, TASKS_RECEIVED } from "../types";

const initialState = {
    tasks: {},
    loading: false
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_TASKS:
            return {
                ...state,
                loading: true
            };
        case TASKS_RECEIVED:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default taskReducer;