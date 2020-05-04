import axios from '../axios';
const getUserPostsAPI = (value) => {
    let id = value
    return axios.get(`/getUserPosts/${id}`)
}
export default getUserPostsAPI;
