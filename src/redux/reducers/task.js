import { TASKS_RECEIVED, TASK_UPDATED, TASK_DELETED, COMPLETE_TASK } from "../types";

const initialState = {
    tasks: {}
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_RECEIVED:
            return {
                ...state,
                tasks: action.payload
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
            // eslint-disable-next-line no-case-declarations
            const tasks = { ...state.tasks };
            delete tasks[action.payload._id];
            return {
                ...state,
                tasks
            }
        default:
            return state;
    }
}

export default taskReducer;