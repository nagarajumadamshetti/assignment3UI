import { message } from 'antd';
import { connect } from "react-redux";
import SignUp from '../Components/signup/signup';
import SignUpAPI from '../API/signUpAPI';
const validateUserName = async (value) => {
    let success = "warning"

    if (value.length < 4) {
        return success
    }
    if (value.length > 30) {
        return success
    }
    if (!/^[A-Z0-9_-]{3,30}$/i.test(value)) {
        return success
    }
    return "success"
}
const validatePassword = async (value) => {
    let success = "warning"
    if (!value) {
        return success
    }
    if (value.length < 8) {
        return success
    }
    return "success"
}
const validateEmail = async (value) => {
    let success = "warning";
    if (!value) {
        return success;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return success;
    }
    return "success"
}
const validateRole = async (value) => {
    let success = "warning"
    if (!value) {
        return success
    }
    return "success"
}
const validatePhone = async (value) => {
    let success = "warning"
    if (!/^\d{10}$/.test(value)) {
        return success;
    }
    return "success"
}
const validateFunction = async (state) => {

    if (!state.userName) {
        return false
    }

    if (!state.email) {
        return false
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
        return false
    }

    if (!/^\d{10}$/.test(state.phone)) {
        return false
    }

    if (state.userName.length < 4) {
        return false
    }

    if (state.userName.length > 30) {
        return false
    }

    if (!/^[A-Z0-9_-]{3,30}$/i.test(state.username)) {
        return false
    }

    if (!state.password) {
        return false
    }

    if (state.password.length < 8) {
        return false
    }

    return true
}
const mapDispatchToProps = dispatch => {
    return {
        onNameChange: async (value) => {
            const success = await validateUserName(value)
            dispatch({
                type: "USERNAMECHANGE",
                payload: {
                    userName: value,
                    success: success
                }
            })
        },
        onPasswordChange: async (value) => {
            const success = await validatePassword(value);
            dispatch({
                type: "PASSWORDCHANGE",
                payload: {
                    password: value,
                    success: success
                }
            })
        },
        getItem: () =>
            dispatch({
                type: "GET",
            }),
        setItem: async (value) => {
            try {
                let res = await SignUpAPI(value);
                if (res.data.success) {
                    message.success("signUp successful");
                    dispatch({
                        type: "SUBMITSIGNUP",
                        payload: res.data
                    })
                }
                else {
                    message.warn("signUp unsuccessful");
                }
            } catch (error) {
                console.log(error)
            }

        },
        validate: async () => {

            await dispatch(async (dispatch, getState) => {
                let signUpStates = await getState().signUpReducer
                let success = await validateFunction(signUpStates)
                dispatch({
                    type: "VALIDATE",
                    payload: success
                })
            })
        },
        setEmail: async (value) => {
            const success = await validateEmail(value);
            dispatch({
                type: "EMAIL",
                payload: {
                    email: value,
                    success: success
                }
            })
        },
        setRole: async (value) => {
            const success = await validateRole(value);
            dispatch({
                type: "ROLE",
                payload: {
                    role: value,
                    success: success
                }
            })
        },
        setPhone: async (value) => {
            const success = await validatePhone(value);
            dispatch({
                type: "PHONE",
                payload: {
                    phone: value,
                    success: success
                }
            })
        },
    };
};
const mapStateToProps = (state) => ({
    userName: state.signUpReducer.userName,
    password: state.signUpReducer.password,
    localStorageData: state.signUpReducer.localStorageData,
    phone: state.signUpReducer.phone,
    role: state.signUpReducer.role,
    email: state.signUpReducer.email,
    success: state.signUpReducer.success,
    userNameValidated: state.signUpReducer.userNameValidated,
    passwordValidated: state.signUpReducer.passwordValidated,
    emailValidated: state.signUpReducer.emailValidated,
    phoneValidated: state.signUpReducer.phoneValidated,
    roleValidated: state.signUpReducer.roleValidated,
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);