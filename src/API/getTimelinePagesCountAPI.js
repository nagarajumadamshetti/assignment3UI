import axios from '../axios';
const getTimelinePagesCountAPI = (value) => {
    const token = localStorage.getItem("token");
    return axios.get(`/user/timelinePagesCount/${token}`);
}
export default getTimelinePagesCountAPI;
