import axios from '../axios';
const declineSignUpRequestAPI = (value) => {
    return axios.delete('/admin/userRequests/decline', {
        data: {
            id: value.id,
        }
    });
}
export default declineSignUpRequestAPI;
