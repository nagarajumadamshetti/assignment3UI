import axios from '../axios';
const getFollowersAndFollowingAPI = (id) => {
    return axios.get(`/user/getFollowersAndFollowingWithId/${id}`);
}
export default getFollowersAndFollowingAPI;
