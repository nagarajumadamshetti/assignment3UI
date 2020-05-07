import axios from '../axios';
const deletePostAPI = (value) => {
    return axios.post('/deletePost', {
        postId: value.postId
    });
}
export default deletePostAPI;
