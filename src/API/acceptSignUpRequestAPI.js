import axios from '../axios';
const acceptSignUpRequestAPI = (value) => {
    return axios.put('/admin/userRequests/accept', {
        id: value.id,
        accepted: value.value
    });
}
export default acceptSignUpRequestAPI;
