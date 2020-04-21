import axios from '../axios';
const getUserPostsAPI = async (value) => {
    let id = value
    await axios.get(`/getUserPosts/${id}`)
        .then((res) => {
            if (res.data.success) {
                return {
                    data: res.data.data[0].posts,
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
export default getUserPostsAPI;
