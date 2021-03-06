import axios from '../axios';
import { message } from 'antd';
let initialState = {
    userName: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    localStorageData: '',
    success: '',
    requests: '',
    toggle: false,
    userData: '',
    userList: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETUSERDATA": {
            return {
                ...state,
            }
        }

        case "TOGGLEUSER": {
            state.toggle = !state.toggle
            return {
                ...state,
            }
        }

        case "GETSIGNUPREQUESTS": {
            console.log("get signup requests at admin reducer")
            state.requests = action.payload
            return {
                ...state
            }
        }

        case "GETUSERSLIST": {
            state.userList=action.payload
            return {
                ...state,
            }
        }

        case "ACCEPT": {
            return {
                ...state,
            }
        }

        case "DECLINE": {
            return {
                ...state,
            }
        }
        
        default: return state;
    }
}

export default reducer;
