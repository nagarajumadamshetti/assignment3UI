import axios from '../axios';
const likePostAPI = async (value) => {
    await axios.post('/likeOrUnlikePost', {
        loggedUserIdToken: localStorage.getItem("token"),
        postId: value.postId
    })
        .then((res) => {
            if (res.data.success) {
                return {
                    data: res.data.likes,
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
export default likePostAPI;
