import axios from '../axios';
const getFollowRequestsAPI = (v) => {
    // try {

    let value = v;

    return axios.get(`/getFollowRequests/${value}`)

    // } catch (error) {
    //     console.log(error)
    // }
    // let v = value;
    // await axios.get(`/getFollowRequests/${v}`);
    //     .then((res) => {
    //     if (res.data.success) {
    //         return {
    //             data: res.data.followRequests,
    //             success: res.data.success
    //         }
    //     }
    //     else {
    //         return {
    //             success: res.data.success
    //         }
    //     }
    // })
    // .catch((err) => {
    //     console.log(err)
    //     return {
    //         err,
    //         success: false
    //     };
    // });
}
export default getFollowRequestsAPI;