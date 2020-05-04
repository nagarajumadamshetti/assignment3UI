import axios from '../axios';
const getTimelineAPI = (page) => {
    let token = localStorage.getItem("token");
    return axios.get(`/timeline/${token}/${page}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
}
export default getTimelineAPI;
