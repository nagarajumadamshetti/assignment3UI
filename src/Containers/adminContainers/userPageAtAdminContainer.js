import { message } from 'antd';
import { connect } from "react-redux";
import UserPageAtAdmin from '../../Components/admin/userPageAtAdmin';

const mapStateToProps = state => ({
    userName: state.userReducer.userName,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
            setUsersUserName: (value) =>
            dispatch({
                type: "SETUSERUSERNAME",
                payload: value
            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPageAtAdmin));