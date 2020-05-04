import axios from '../axios';
const followAndUnFollowAPI = (v) => {
    let value = v;
    if (value.followed) {
        return axios.post('/unFollow', {
            userName: value.userName
        }
        ,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
    }
    else {
        return axios.post("/follow", {
            userName: value.userName
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
    }
}
export default followAndUnFollowAPI;
