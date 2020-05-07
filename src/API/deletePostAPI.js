import axios from '../axios';
const deletePostAPI = (value) => {
    return axios.post('/user/deletePost', {
        postId: value.postId
    });
}
export default deletePostAPI;
