import axios from '../axios';
const commentOnPostAPI = (v) => {
    let value = v;
    return axios.post('/addComment', {
        postId: value.postId,
        comment: value.comment,
    }
        ,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
}
export default commentOnPostAPI;
