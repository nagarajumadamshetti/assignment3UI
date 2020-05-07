import axios from '../axios';
const likePostAPI = (value) => {
    return axios.post('/likeOrUnlikePost', {
        postId: value.postId
    });
}
export default likePostAPI;
