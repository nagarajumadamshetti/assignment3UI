import axios from '../axios';
const getCommentsAPI = (v) => {
    return axios.get(`/user/getComments/${v}`);
}
export default getCommentsAPI;
