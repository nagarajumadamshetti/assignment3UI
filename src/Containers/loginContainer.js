import { message } from 'antd';
import { connect } from "react-redux";
import Login from '../Components/login/login';
import LoginAPI from '../API/loginAPI';

const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) =>
            dispatch({
                type: "USERNAMECHANGE",
                payload: value
            }),
        onPasswordChange: (value) =>
            dispatch({
                type: "PASSWORDCHANGE",
                payload: value
            }),
        onSubmitLogin: async (value) => {
            try {
                let res = await LoginAPI(value)
                if (res.data.success) {
                    dispatch({
                        type: "SUBMITLOGIN",
                        payload: res.data
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

        setUserUserName: (value) => {
            dispatch({
                type: "SETUSERUSERNAME",
                payload: value
            })
        },
    };
};
const mapStateToProps = (state) => ({
    userName: state.loginReducer.userName,
    password: state.loginReducer.password,
    localStorageData: state.loginReducer.localStorageData,
    success: state.loginReducer.success,
    uSuccess: state.loginReducer.uSuccess,
    pSuccess: state.loginReducer.pSuccess,
    role: state.loginReducer.role,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);