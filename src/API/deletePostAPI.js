import axios from '../axios';
const deletePostAPI = async (value) => {
    await axios.post('/deletePost', {
        postId: value.postId
    })
        .then((res) => {
            if (res.data.success) {
                return {
                    data: res.data.posts,
                    success: res.data.success
                }
            }
            else {
                return {
                    success: res.data.success
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                err,
                success: false
            };
        });
}
export default deletePostAPI;
