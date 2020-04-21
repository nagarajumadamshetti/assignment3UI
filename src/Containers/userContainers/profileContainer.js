import { message } from 'antd';
import { connect } from "react-redux";
import Profile from '../../Components/user/profile';
import GetUserPostsAPI from '../../API/getUserPostsAPI';
import LikePostAPI from '../../API/likePostAPI';
import DeletePostAPI from '../../API/deletePostAPI';

const mapStateToProps = state => ({
    userName: state.loginReducer.userName,
    userPosts: state.userReducer.userPosts,
    searchValue: state.userReducer.searchValue,
    comments: state.userReducer.comments,
});
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: async (value) => {
            console.log(value)
            let id = value

            let res = await GetUserPostsAPI(value)
            if (res.data.success) {
                dispatch({
                    type: "GETUSERPOSTS",
                    payload: res.data.data[0].posts
                })
            }
        },

        onDeletePost: async (value) => {
            let res = await DeletePostAPI(value)
            if (res.data.success) {
                dispatch({
                    type: "DELETEUSERPOST",
                    payload: res.data.posts,
                })
            }
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
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));