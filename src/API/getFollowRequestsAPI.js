import axios from '../axios';
const getFollowRequestsAPI = (v) => {
    let value = v;
    return axios.get(`/getFollowRequests/${value}`)
}
export default getFollowRequestsAPI;