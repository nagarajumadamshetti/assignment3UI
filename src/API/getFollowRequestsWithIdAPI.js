import axios from '../axios';
const getFollowRequestsAPI = (value) => {
    return axios.get(`/user/getFollowRequestsWithId/${value}`);
}
export default getFollowRequestsAPI;