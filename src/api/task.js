import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const task = {
    fetchAll: data => axios.get(`${SERVER_URL}/api/tasks/${data.projectId}/?complete=${data.complete}`).then(res => res.data),
    addTask: data => axios.post(`${SERVER_URL}/api/tasks`, { data }).then(res => res.data.task),
    updateTask: data => axios.post(`${SERVER_URL}/api/tasks/update`, { data }).then(res => res.data.task),
    deleteTask: data => axios.post(`${SERVER_URL}/api/tasks/delete`, { data }).then(res => res.data.task),
    completeTask: data => axios.post(`${SERVER_URL}/api/tasks/complete`, { data }),
    getTasksGraphData: data => axios.post(`${SERVER_URL}/api/tasks/graphdata`, { data }).then(res => res.data.data),
    getStarredTasks: data => axios.get(`${SERVER_URL}/api/tasks/${data.workspaceId}/starred`).then(res => res.data.tasks),
}

export default task;