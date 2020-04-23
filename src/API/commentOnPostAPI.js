import axios from '../axios';
const commentOnPostAPI = (v) => {
    // try {
    let value = v;
    return axios.post('/addComment', {
        token: localStorage.getItem("token"),
        postId: value.postId,
        comment: value.comment,
    })
    // } catch (error) {
    //     console.log(error)
    // }

    // let value=v;
    // await axios.post('/addComment', {
    //     token: localStorage.getItem("token"),
    //     postId: value.postId,
    //     comment: value.comment,
    // })
    //     .then((res) => {
    //         if (res.data.success) {
    //             return{
    //                 success:Response.data.success,
    //                 data:res.data.comments
    //             }
    //         }
    //         else{
    //             return{
    //                 success:res.data.success
    //             }
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return{
    //             err,
    //             success:false
    //         }
    //     })
}
export default commentOnPostAPI;
