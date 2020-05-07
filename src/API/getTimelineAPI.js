import axios from '../axios';
const getTimelineAPI = (page) => {
    let token = localStorage.getItem("token");
    return axios.get(`/user/timeline/${token}/${page}`);
}
export default getTimelineAPI;
