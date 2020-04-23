import SideDrawer from '../Components/SideDrawer/sideDrawer';
import { message } from 'antd';
import { connect } from "react-redux";
import GetFollowRequestsAPI from '../API/getFollowRequestsAPI';
import GetSignUpRequestsAPI from '../API/getSignUpRequestsAPI';

const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle: state.adminReducer.toggle,
    signUpRequests: state.adminReducer.requests,
    loggedUserName: state.loginReducer.userName,
    userName: state.loginReducer.userName,
    followRequests: state.userReducer.followRequests
})
const mapDispatchToProps = dispatch => {
    return {
        onChangeToggle: () =>
            dispatch({
                type: "TOGGLEUSER"
            }),
        setUserUserName: (value) =>
            dispatch({
                type: "SETUSERUSERNAME",
                payload: value
            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
        onGetFollowRequests: async (value) => {
            try {
                let v = value

                let res = await GetFollowRequestsAPI(v);
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
        onGetSignUpRequests: async () => {
            try {

                let res = await GetSignUpRequestsAPI()
                if (res.data.success) {
                    dispatch({
                        type: "GETSIGNUPREQUESTS",
                        payload: res.data.users
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));
