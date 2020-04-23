import { message } from 'antd';
import { connect } from "react-redux";
import Timeline from '../../Components/user/timeline';
import GetTimelineAPI from '../../API/getTimelineAPI';
import LikePostAPI from '../../API/likePostAPI';
import UploadPostAPI from '../../API/uploadPostAPI';


const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    description: state.userReducer.description,
    timeline: state.userReducer.timeline,
    comments: state.userReducer.comments,
})
const mapDispatchToProps = dispatch => {
    return {
        getTimeline: async (value) => {
            try {
                let res = await GetTimelineAPI()
                if (res.data.success) {
                    dispatch({
                        type: "GETTIMELINE",
                        payload: res.data.posts
                    })
                }
                else {
                    message.warn("timeline not recieved")
                }
            } catch (error) {
                console.log(error)
            }

        },

        uploadPost: async (value) => {
            try {
                let res = await UploadPostAPI(value)
                if (res.data.success) {
                    message.success("successfully uploaded the post");
                    dispatch({
                        type: "UPLOADNEWPOST",
                        payload: value.imageList
                    })
                }
                else {
                    message.warning("err uploading the post at timeline container");
                }
            } catch (error) {
                console.log(error)
            }

        },

        uploadDescription: (value) =>
            dispatch({
                type: "NEWDESCRIPTION",
                payload: value
            }),

        onLikePost: async (value) => {
            try {
                let res = await LikePostAPI(value)
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
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Timeline));