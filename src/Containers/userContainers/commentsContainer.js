import { connect } from "react-redux";

import Comments from '../../Components/user/comments';

import CommentOnPostAPI from '../../API/commentOnPostAPI';
import GetCommentsAPI from '../../API/getCommentsAPI';

const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    description: state.userReducer.description,
    timeline: state.userReducer.timeline,
    comments: state.userReducer.comments,
})
const mapDispatchToProps = dispatch => {
    return {

        onCommentPost: async (value) => {
            try {
                let res = await CommentOnPostAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "GETCOMMENTS",
                        payload: res.data.comments,
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },
        onGetComments: async (value) => {
            try {
                let res = await GetCommentsAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "GETCOMMENTS",
                        payload: res.data.data[0].comments,
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Comments));