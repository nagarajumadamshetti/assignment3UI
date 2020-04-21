import { message } from 'antd';
import { connect } from "react-redux";
import SearchPost from '../../Components/user/search';
import GetUserPostsAPI from '../../API/getUserPostsAPI';
import LikePostAPI from '../../API/likePostAPI';
import GetFollowersAndFollowingAPI from '../../API/getFollowersAndFollowingAPI';

const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    searchValue: state.userReducer.searchValue,
    followRequests: state.userReducer.followRequests,
    followers: state.userReducer.followers,
    success: state.userReducer.success
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: async (value) => {
            let v=value;
            let res = await GetUserPostsAPI(v)
            if (res.data.success) {
                dispatch({
                    type: "GETUSERPOSTS",
                    payload: res.data.data[0].posts
                })
                dispatch({
                    type: "SETGETUSERSUCCESS",
                    payload: true
                })
            }
            else {
                dispatch({
                    type: "SETGETUSERSUCCESS",
                    payload: false
                })
            }
        },

        onNewSearch: (value) => {
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            })
            dispatch({
                type: "SETGETUSERSUCCESS",
                payload: false
            })
        },

        onLikePost: async (value) => {
            let res = await LikePostAPI(value);
            if (res.data.success) {
                dispatch({
                    type: "LIKEUSERPOST",
                    payload: res.data.likes,
                })
            }
        },

        getUserFollowersAndFollowing: async (value) => {
            let res = await GetFollowersAndFollowingAPI(value);
            if (res.data.success) {
                dispatch({
                    type: "GETUSERFOLLOWERSANDFOLLOWING",
                    payload: {
                        following: (res.data.following[0].following),
                        followers: (res.data.followers[0].followers)
                    }
                })
                dispatch({
                    type: "SETGETUSERSUCCESS",
                    payload: true
                })
            }
            else {
                dispatch({
                    type: "SETGETUSERSUCCESS",
                    payload: false
                })
            }
        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));