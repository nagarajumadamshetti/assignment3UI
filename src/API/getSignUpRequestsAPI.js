import axios from '../axios';
const getSignUpRequestsAPI = () => {
    // try {
    return axios.get('/admin/userRequests')

    // } catch (error) {
    //     console.log(error);
    // }
    // await axios.get('/admin/userRequests')
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 data: res.data.users,
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
export default getSignUpRequestsAPI;
