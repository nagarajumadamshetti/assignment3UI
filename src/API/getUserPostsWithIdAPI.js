import axios from '../axios';
const getUserPostsAPI = (id) => {
    return axios.get(`/user/getUserPostsWithId/${id}`);
}
export default getUserPostsAPI;
