import axios from '../axios';
const getCommentsAPI = (value) => {
    let v = value;
    return axios.get(`/getComments/${v}`);
}
export default getCommentsAPI;
