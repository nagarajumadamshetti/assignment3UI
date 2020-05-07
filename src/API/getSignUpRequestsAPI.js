import axios from '../axios';
const getSignUpRequestsAPI = () => {
    return axios.get('/user/admin/userRequests');
}
export default getSignUpRequestsAPI;
