import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const project = {
    fetchAll: workspaceId => axios.get(`${SERVER_URL}/api/projects/${workspaceId}`).then(res => res.data.projects),
    addProject: data => axios.post(`${SERVER_URL}/api/projects`, { data }).then(res => res.data.project),
    updateProject: data => axios.post(`${SERVER_URL}/api/projects/update`, { data }).then(res => res.data.project),
    deleteProject: data => axios.post(`${SERVER_URL}/api/projects/delete`, { data }),
    fetchRecentProjects: workspaceId => axios.get(`${SERVER_URL}/api/projects/recent/${workspaceId}`).then(res => res.data.lists),
}

export default project;