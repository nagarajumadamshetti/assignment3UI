import axios from '../axios';
const getTimelinePagesCountAPI = (value) => {
    let token = localStorage.getItem("token");
    return axios.get(`/timelinePagesCount/${token}`
        ,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        });
}
export default getTimelinePagesCountAPI;
