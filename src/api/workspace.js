import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const workspace = {
    fetchAll: () => axios.get(`${SERVER_URL}/api/workspaces`).then(res => res.data.workspaces),
    addWorkspace: (data) => axios.post(`${SERVER_URL}/api/workspaces`, { data }).then(res => res.data.workspaces),
    getWorkspace: workspaceId => axios.get(`${SERVER_URL}/api/workspaces/${workspaceId}`).then(res => res.data.workspace)
}

export default workspace;