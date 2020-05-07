import axios from '../axios';
const acceptFollowRequestAPI = (v) => {
    let value = v;
    return axios.put('/user/approveFollowRequest', {
        accepted: value.value,
        followRequestUserId: value.index,
    });
}
export default acceptFollowRequestAPI;
