import { LOADING_TASKS, TASKS_RECEIVED } from "../types";
import api from "../../api";

export const loadingTasks = () => {
    return {
        type: LOADING_TASKS
    }
};

export const fetchTasks = projectId => {
    return dispatch => {
        dispatch(loadingTasks());
        return api.task.fetchAll(projectId);
    }
}

export const tasksReceived = data => {
    return {
        type: TASKS_RECEIVED,
        payload: data
    }
}