import axios from '../axios';
import { message } from 'antd';
const initialState = {
    userName: 'adf',
    password: '',
    role: '',
    email: '',
    phone: '',
    accept: false,
    localStorageData: '',
    success: '',
    userNameValidated: '',
    passwordValidated: '',
    roleValidated: '',
    emailValidated: '',
    phoneValidated: '',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            let success = "warning"
            state.userName = action.payload
            console.log("a1")
            if (state.userName.length < 4) {
                state.userNameValidated = success
                console.log("a2")
                return {
                    ...state,
                    userNameValidated: success
                }
            }
            if (state.userName.length > 30) {
                state.userNameValidated = success
                console.log("a3")
                return {
                    ...state,
                    userNameValidated: success
                }
            }
            if (!/^[A-Z0-9_-]{3,30}$/i.test(state.username)) {
                state.userNameValidated = success
                console.log("a4")
                return {
                    ...state,
                    userNameValidated: success
                }
            }
            state.userNameValidated = "success"
            return {
                ...state,
                userNameValidated: "success",
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE": {
            let success = "warning"
            state.password = action.payload
            if (!state.password) {
                return {
                    ...state,
                    passwordValidated: success
                }
            }
            if (state.password.length < 8) {
                return {
                    ...state,
                    passwordValidated: success
                }
            }
            state.passwordValidated = "success"
            return {
                ...state,
                passwordValidated: "success",
                password: action.payload
            }
        }

        case "GET": {
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(state.userName))
            }
        }
        case "SUBMITSIGNUP": {
            console.log("entered setsignup case")
            return {
                ...state,
            }
            // if (state.role === "user") {
            //     console.log("entered signup set in signup reducer")
            //     let l = JSON.parse(localStorage.getItem("admin"));
            //     l.requests.push(state.userName);
            //     localStorage.setItem("admin", JSON.stringify(l));
            //     state.localStorageData = localStorage.setItem(state.userName, JSON.stringify(action.payload))

            //     axios.post('/signUp', {
            //         userName:state.userName,
            //         password:state.password,
            //         role:state.role,
            //         email:state.email,
            //         accepted:state.accept,
            //         phone:state.phone,
            //     }).then((res) => {
            //         if (res.data.success) {

            //             message.success('signup success');
            //         }
            //         else {
            //             message.error('Invalid credentials');
            //             return;
            //         }
            //     }
            //     ).catch((err) => {
            //         console.log(err)
            //         message.warn('error recieved from backend server');
            //         return;
            //     });
            // }
            // else{
            //     localStorage.setItem(state.userName, JSON.stringify(action.payload));
            // }

        }
        case "EMAIL": {

            let success = "warning"
            state.email = action.payload
            if (!state.email) {
                return {
                    ...state,
                    emailValidated: success
                }
            }
            console.log("enterd p1-1")
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
                return {
                    ...state,
                    emailValidated: success
                }
            }
            state.emailValidated = "success"
            return {
                ...state,
                emailValidated: "success",
                email: action.payload
            }
        }
        case "PHONE": {
            let success = "warning"
            state.phone = action.payload
            if (!/^\d{10}$/.test(state.phone)) {
                return {
                    ...state,
                    phoneValidated: success
                }
            }
            state.phoneValidated = "success"
            return {
                ...state,
                phoneValidated: "success",
                phone: action.payload
            }
        }
        case "ROLE": {
            let success = "warning"
            console.log("we")
            state.role = action.payload
            console.log(state.role)
            if (!state.role) {
                return {
                    ...state,
                    roleValidated: success
                }
            }
            state.roleValidated = "success"
            return {
                ...state,
                roleValidated: "success",
                role: action.payload
            }
        }
        case "VALIDATE": {
            console.log("entered p0")
            if (!state.userName) {
                console.log("entered p1");
                return {
                    ...state,
                    success: false
                }
            }
            if (!state.email) {
                console.log("entered p4")
                return {
                    ...state,
                    success: false
                }
            }
            console.log("enterd p1-1")
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
                console.log("entered p2")
                return {
                    ...state,
                    success: false
                }
            }
            if (!/^\d{10}$/.test(state.phone)) {
                console.log("entered p3");
                return {
                    ...state,
                    success: false
                }
            }

            if (state.userName.length < 4) {
                console.log("entered p5");
                return {
                    ...state,
                    success: false
                }
            }
            if (state.userName.length > 30) {
                console.log("entered p6");
                return {
                    ...state,
                    success: false
                }
            }
            if (!/^[A-Z0-9_-]{3,30}$/i.test(state.username)) {
                console.log("entered p7");
                return {
                    ...state,
                    success: false
                }
            } // Add uniqueness
            if (!state.password) {
                console.log("entered p8");
                return {
                    ...state,
                    success: false
                }
            }
            if (state.password.length < 8) {
                console.log("entered p9");
                return {
                    ...state,
                    success: false
                }
            }
            console.log("entered p10");
            return {
                ...state,
                success: true
            }
        }
        default: return state;
    }
}
export default reducer;