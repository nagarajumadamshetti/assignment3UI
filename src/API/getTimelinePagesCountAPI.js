import axios from '../axios';
const getTimelinePagesCountAPI = (value) => {
    let token = localStorage.getItem("token");
    return axios.get(`/user/timelinePagesCount/${token}`);
}
export default getTimelinePagesCountAPI;
