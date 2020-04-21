import { message } from 'antd';
import { connect } from "react-redux";
import UserPageAtAdmin from '../../Components/admin/userPageAtAdmin';

const mapStateToProps = state => ({
    userName: state.loginReducer.userName,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPageAtAdmin));