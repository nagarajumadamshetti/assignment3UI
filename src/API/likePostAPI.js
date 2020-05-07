import axios from '../axios';
const likePostAPI = (value) => {
    return axios.post('/user/likeOrUnlikePost', {
        postId: value.postId
    });
}
export default likePostAPI;
