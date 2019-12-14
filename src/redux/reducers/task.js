import { LOADING_TASKS, TASKS_RECEIVED, TASK_UPDATED } from "../types";

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
        case TASK_UPDATED:
            // eslint-disable-next-line no-case-declarations
            const data = { ...state.tasks };

            data[action.payload._id] = action.payload
            return {
                ...state,
                tasks: data
            }
        default:
            return state;
    }
}

export default taskReducer;