import { TASKS_RECEIVED, TASK_UPDATED, TASK_DELETED, COMPLETE_TASK } from "../types";
import api from "../../api";

export const fetchTasks = (projectId, complete) => {
    return () => {
        return api.task.fetchAll({
            projectId,
            complete
        });
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

export const completeTaskUI = task => {
    return {
        type: COMPLETE_TASK,
        payload: task
    }
}

export const completeTask = task => {
    return dispatch => {
        dispatch(completeTaskUI(task));
        return api.task.completeTask({
            taskId: task._id,
            projectId: task.projectId,
            workspaceId: task.workspaceId,
            status: task.complete
        });
    }
}

export const fetchStarredTasks = data => {
    return () => {
        return api.task.getStarredTasks(data);
    }
}