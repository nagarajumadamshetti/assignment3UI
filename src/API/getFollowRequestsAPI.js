import axios from '../axios';
const getFollowRequestsAPI = (value) => {
    return axios.get(`/user/getFollowRequests/${value}`);
}
export default getFollowRequestsAPI;