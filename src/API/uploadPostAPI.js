import axios from '../axios';
const uploadPostAPI = async (value) => {
    axios.post('/uploadNewPost', {
        token: localStorage.getItem("token"),
        description: value.description,
        imageList: value.fileList
    })
        .then((res) => {
            if (res.data.success) {
                return {
                    // data: res.data.posts,
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
export default uploadPostAPI;
