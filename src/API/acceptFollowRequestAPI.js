import axios from '../axios';
const acceptFollowRequestAPI = async (v) => {
    try {
        let value = v;
        return await axios.put('/approveFollowRequest', {
            accepted: value.value,
            followRequestUserId: value.index,
            loggedUserIdToken: localStorage.getItem('token'),
        })
    } catch (error) {
        console.log(error);
    }

    // let value = v
    // await axios.put('/approveFollowRequest', {
    //     accepted: value.value,
    //     followRequestUserId: value.index,
    //     loggedUserIdToken: localStorage.getItem('token'),
    // })
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 success: res.data.success,
    //                 data: res.data.followRequests
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
    //             succ: false
    //         }
    //     })

}
export default acceptFollowRequestAPI;
