import axios from '../axios';
const commentOnPostAPI = (value) => {
    return axios.post('/user/addComment', {
        postId: value.postId,
        comment: value.comment,
    });
}
export default commentOnPostAPI;
