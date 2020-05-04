import axios from '../axios';
const declineFollowRequestAPI = (v) => {
    let value = v;
    return axios.delete('/declineFollowRequest', {
        data: {
            accepted: value.value,
            followRequestUserId: value.index,
        }
    }
        ,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        })
}
export default declineFollowRequestAPI;
