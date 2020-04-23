import { message } from 'antd';
import { connect } from "react-redux";
import UserInfo from '../../Components/user/userInfo';
import GetFollowersAndFollowingAPI from '../../API/getFollowersAndFollowingAPI';
import FollowAndUnFollowAPI from '../../API/followAndUnFollowAPI';
import GetFollowRequestsAPI from '../../API/getFollowRequestsAPI';

const mapStateToProps = state => ({
    userName: state.loginReducer.userName,
    followers: state.userReducer.followers,
    following: state.userReducer.following,
    searchValue: state.userReducer.searchValue,
    followRequests: state.userReducer.followRequests,
})

const mapDispatchToProps = dispatch => {
    return {
        getUserFollowersAndFollowing: async (value) => {
            try {
                let res = await GetFollowersAndFollowingAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "GETUSERFOLLOWERSANDFOLLOWING",
                        payload: {
                            following: (res.data.following[0].following),
                            followers: (res.data.followers[0].followers)
                        }
                    })
                }
                else {
                    message.warn(" followers and following NOT recieved at userinfo container")
                }
            } catch (error) {
                console.log(error)
            }

        },

        followAndUnFollow: async (value) => {
            try {
                let res = await FollowAndUnFollowAPI(value);

                if (res.data.success) {
                    dispatch({
                        type: "FOLLOWANDUNFOLLOW",
                        payload: {
                            following: (res.data.following),
                            followers: (res.data.followers)
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },

        onNewSearch: (value) =>
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            }),

        onGetFollowRequests: async (v) => {
            try {
                let value = v
                let res = await GetFollowRequestsAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "GETFOLLOWREQUESTS",
                        payload: res.data.followRequests,
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserInfo));