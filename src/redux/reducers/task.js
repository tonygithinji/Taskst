import { LOADING_TASKS, TASKS_RECEIVED, TASK_UPDATED, TASK_DELETED, COMPLETE_TASK } from "../types";

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
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload._id]: action.payload
                }
            }
        case TASK_DELETED:
            // eslint-disable-next-line no-case-declarations
            const oldTasks = { ...state.tasks };
            delete oldTasks[action.payload._id];

            return {
                ...state,
                tasks: oldTasks
            }
        case COMPLETE_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload._id]: action.payload
                }
            }
        default:
            return state;
    }
}

export default taskReducer;