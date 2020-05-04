import axios from '../axios';
const acceptSignUpRequestAPI = (value) => {
    return axios.put('/admin/userRequests/accept', {
        userName: value.userName,
        accepted: value.value
    })
}
export default acceptSignUpRequestAPI;
