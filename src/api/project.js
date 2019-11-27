import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const project = {
    fetchAll: workspaceId => axios.get(`${SERVER_URL}/api/projects/${workspaceId}`).then(res => res.data.projects),
    addProject: (data) => axios.post(`${SERVER_URL}/api/projects`, { data }).then(res => res.data.project),
}

export default project;