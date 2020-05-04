import axios from '../axios';
const getUsersListAPI = () => {
    return axios.get('/admin/userList');
}
export default getUsersListAPI;