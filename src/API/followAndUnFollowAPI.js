import axios from '../axios';
const followAndUnFollowAPI = (v) => {
    let value = v;
    if (value.followed) {
        return axios.post('/unFollow', {
            userName: value.userName
        });
    }
    else {
        return axios.post("/follow", {
            userName: value.userName
        });
    }
}
export default followAndUnFollowAPI;
