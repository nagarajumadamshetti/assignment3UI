import axios from '../axios';
const acceptFollowRequestAPI = (value) => {
    return axios.put('/user/approveFollowRequest', {
        accepted: value.value,
        followRequestUserId: value.index,
    });
}
export default acceptFollowRequestAPI;
