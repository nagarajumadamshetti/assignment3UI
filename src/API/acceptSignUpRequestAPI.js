import axios from '../axios';
const acceptSignUpRequestAPI = (value) => {
    // try {
    return axios.put('/admin/userRequests/accept', {
        userName: value.userName,
        accepted: value.value
    })
    // } catch (error) {
    //     console.log(error);
    // }
    // await axios.put('/admin/userRequests/accept', {
    //     userName: value.userName,
    //     accepted: value.value
    // })
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 // data: res.data.users,
    //                 success: res.data.success
    //             }
    //         }
    //         else {
    //             return {
    //                 success: res.data.success
    //             }
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         return {
    //             err,
    //             success: false
    //         };
    //     });


}
export default acceptSignUpRequestAPI;
