import { LOADING_TASKS, TASKS_RECEIVED, TASK_UPDATED, TASK_DELETED } from "../types";
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

export const addTask = data => {
    return () => {
        return api.task.addTask(data);
    }
}

export const updateTask = data => {
    return () => {
        return api.task.updateTask(data);
    }
}

export const taskUpdated = task => {
    return {
        type: TASK_UPDATED,
        payload: task
    }
}

export const deleteTask = data => {
    return () => {
        return api.task.deleteTask(data);
    }
}

export const taskDeleted = task => {
    return {
        type: TASK_DELETED,
        payload: task
    }
}