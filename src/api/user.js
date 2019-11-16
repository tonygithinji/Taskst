import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const user = {
    login: credentials => axios.post(`${SERVER_URL}/api/auth/login`, { credentials }).then(res => res.data),
    register: data => axios.post(`${SERVER_URL}/api/users`, { data }).then(res => res.data),
    validateToken: token => axios.post(`${SERVER_URL}/api/auth/validatetoken`, { token }).then(res => res.data)
};

export default user; 