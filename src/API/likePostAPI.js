import axios from '../axios';
const likePostAPI = (value) => {
    return axios.post('/likeOrUnlikePost', {
        postId: value.postId
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        });
}
export default likePostAPI;
