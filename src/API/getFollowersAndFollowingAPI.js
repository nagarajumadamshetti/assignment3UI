import axios from '../axios';
const getFollowersAndFollowingAPI = (value) => {
    let id = value;
    return axios.get(`/user/getFollowersAndFollowing/${id}`);
}
export default getFollowersAndFollowingAPI;
