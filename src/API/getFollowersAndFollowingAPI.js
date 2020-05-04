import axios from '../axios';
const getFollowersAndFollowingAPI = (value) => {
    let id = value;
    return axios.get(`/getFollowersAndFollowing/${id}`)
}
export default getFollowersAndFollowingAPI;
