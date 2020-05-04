import axios from '../axios';
const acceptFollowRequestAPI = (v) => {
    let value = v;
    return axios.put('/approveFollowRequest', {
        accepted: value.value,
        followRequestUserId: value.index,
    }
    ,
    {
        headers:{
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token'),
        }
    })
}
export default acceptFollowRequestAPI;
