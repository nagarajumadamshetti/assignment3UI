import axios from '../axios';
const declineSignUpRequestAPI = (value) => {
    return axios.delete('/admin/userRequests/decline', {
        data: {
            userName: value.userName,
        }
    })
}
export default declineSignUpRequestAPI;
