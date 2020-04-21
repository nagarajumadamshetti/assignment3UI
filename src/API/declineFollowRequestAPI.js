import axios from '../axios';
const declineFollowRequestAPI = async (v) => {
    try {
        let value = v;
        return await axios.delete('/declineFollowRequest', {
            data: {
                accepted: value.value,
                followRequestUserId: value.index,
                loggedUserIdToken: localStorage.getItem('token'),
            }
        })
    } catch (error) {
        console.log(error);
    }

    // let value = v;
    // await axios.delete('/declineFollowRequest', {
    //     data: {
    //         accepted: value.value,
    //         followRequestUserId: value.index,
    //         loggedUserIdToken: localStorage.getItem('token'),
    //     }
    // })
    // .then((res) => {
    //     if (res.data.success) {
    //         return {
    //             success: res.data.success
    //         }
    //     }
    //     else {
    //         return {
    //             success: res.data.success
    //         }
    //     }
    // })
    //     .catch((err) => {
    //         console.log(err);
    //         return {
    //             err,
    //             success: false
    //         }
    //     })
}
export default declineFollowRequestAPI;
