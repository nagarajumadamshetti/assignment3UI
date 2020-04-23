import axios from '../axios';
const getFollowersAndFollowingAPI = (value) => {
    // try {

    let id = value;
    return axios.get(`/getFollowersAndFollowing/${id}`)

    // } catch (error) {
    //     console.log(error)
    // }
    // let id = value;
    // await axios.get(`/getFollowersAndFollowing/${id}`)
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 data: {
    //                     following: (res.data.following[0].following),
    //                     followers: (res.data.followers[0].followers),
    //                 },
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
export default getFollowersAndFollowingAPI;
