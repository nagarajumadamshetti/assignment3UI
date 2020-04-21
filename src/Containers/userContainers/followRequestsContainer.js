import { connect } from "react-redux";
import FollowRequests from '../../Components/user/followRequest';
import GetFollowRequestsAPI from '../../API/getFollowRequestsAPI';
import AcceptFollowRequestAPI from '../../API/acceptFollowRequestAPI';
import DeclineFollowRequestAPI from '../../API/declineFollowRequestAPI';

const mapDispatchToProps = dispatch => {
    return {
        onGetFollowRequests: async (value) => {
            let res = await GetFollowRequestsAPI(value)
            if (res.data.success) {
                dispatch({
                    type: "GETFOLLOWREQUESTS",
                    payload: res.data.followRequests,
                })
            }
        },

        accept: async (value) => {
            let res = await AcceptFollowRequestAPI(value);
            if (res.data.success) {
                dispatch({
                    type: "ACCEPTFOLLOW",
                    payload: res.data.followRequests
                })
            }
        },

        decline: async (value) => {
            let res = await DeclineFollowRequestAPI(value)
            if (res.data.success) {
                dispatch({
                    type: "DECLINEFOLLOW",
                    payload: value
                })
            }
        },
    }
}

const mapStateToProps = state => ({
    followRequests: state.userReducer.followRequests,
    userName: state.userReducer.userName,
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowRequests);