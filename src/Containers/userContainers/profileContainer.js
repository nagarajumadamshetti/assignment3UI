import { message } from 'antd';
import { connect } from "react-redux";
import Profile from '../../Components/user/profile';
import GetUserPostsAPI from '../../API/getUserPostsAPI';
import LikePostAPI from '../../API/likePostAPI';
import DeletePostAPI from '../../API/deletePostAPI';

const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    // u: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    searchValue: state.userReducer.searchValue,
    comments: state.userReducer.comments,
});

const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: async (value) => {
            try {
                let id = value

                let res = await GetUserPostsAPI(id)
                if (res.data.success) {
                    dispatch({
                        type: "GETUSERPOSTS",
                        payload: res.data.data[0].posts
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },

        onDeletePost: async (value) => {
            try {
                let res = await DeletePostAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "DELETEUSERPOST",
                        payload: res.data.posts,
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },
        onLikePost: async (value) => {
            try {
                let res = await LikePostAPI(value);
                if (res.data.success) {
                    dispatch({
                        type: "LIKEUSERPOST",
                        payload: res.data.likes,
                    })
                }
            } catch (error) {
                console.log(error)
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