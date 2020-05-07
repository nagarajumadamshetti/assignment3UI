import axios from '../axios';
const getUserPostsAPI = (value) => {
    let id = value
    return axios.get(`/user/getUserPosts/${id}`);
}
export default getUserPostsAPI;
