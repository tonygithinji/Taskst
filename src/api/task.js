import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const task = {
    fetchAll: projectId => axios.get(`${SERVER_URL}/api/tasks/${projectId}`).then(res => res.data.tasks),
    addTask: (data) => axios.post(`${SERVER_URL}/api/tasks`, { data }).then(res => res.data.task),
}

export default task;