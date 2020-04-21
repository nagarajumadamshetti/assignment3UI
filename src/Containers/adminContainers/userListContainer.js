import UserList from '../../Components/admin/userList'
import { message } from 'antd';
import { connect } from "react-redux";
import GetUserListAPI from '../../API/getUsersListAPI'
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle: state.adminReducer.toggle,
    userName: state.loginReducer.userName,
})
const mapDispatchToProps = dispatch => {
    return {
        onGetList: async () => {
            let res = await GetUserListAPI()
            if (res.data.success) {
                dispatch({
                    type: "GETUSERSLIST",
                    payload: res.data.users
                })
            }
        },
        onChangeToggle: () =>
            dispatch({
                type: "TOGGLEUSER"
            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserList));