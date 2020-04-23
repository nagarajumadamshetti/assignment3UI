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
    success: false,
    userNameValidated: '',
    passwordValidated: '',
    roleValidated: '',
    emailValidated: '',
    phoneValidated: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "USERNAMECHANGE": {
            return {
                ...state,
                userNameValidated: action.payload.success,
                userName: action.payload.userName
            }
        }

        case "PASSWORDCHANGE": {
            return {
                ...state,
                passwordValidated: action.payload.success,
                password: action.payload.password
            }
        }

        case "GET": {
            return {
                ...state,
            }
        }

        case "SUBMITSIGNUP": {
            state.userName=''
            state.password=''
            state.email=''
            // state.role=''
            state.phone=''

            return {
                ...state,
            }
        }

        case "EMAIL": {
            return {
                ...state,
                emailValidated: action.payload.success,
                email: action.payload.email
            }
        }

        case "PHONE": {
            return {
                ...state,
                phoneValidated: action.payload.success,
                phone: action.payload.phone
            }
        }

        case "ROLE": {
            return {
                ...state,
                roleValidated: action.payload.success,
                role: action.payload.role
            }
        }

        case "VALIDATE": {
            state.success = action.payload
            return {
                ...state,
                success: action.payload,
            }
        }

        default: return state;
    }
}
export default reducer;