import axios from '../axios';
const declineFollowRequestAPI = (value) => {
    return axios.delete('/user/declineFollowRequest', {
        data: {
            accepted: value.value,
            followRequestUserId: value.index,
        }
    });
}
export default declineFollowRequestAPI;
