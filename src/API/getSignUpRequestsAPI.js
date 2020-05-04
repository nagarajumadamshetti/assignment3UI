import axios from '../axios';
const getSignUpRequestsAPI = () => {
    return axios.get('/admin/userRequests');
}
export default getSignUpRequestsAPI;
