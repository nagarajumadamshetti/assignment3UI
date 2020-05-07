import axios from '../axios';
const commentOnPostAPI = (v) => {
    let value = v;
    return axios.post('/user/addComment', {
        postId: value.postId,
        comment: value.comment,
    });
}
export default commentOnPostAPI;
