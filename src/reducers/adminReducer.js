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
                toggle: state.toggle
            }
        }


        case "GETSIGNUPREQUESTS": {
            // let l =  JSON.parse(localStorage.getItem("admin"))
            //  console.log(l)
            // if(l)
            state.requests = action.payload
            //  console.log(state.requests)

            // console.log(state.requests)
            // axios.get('/admin/userRequests')
            //     .then(async(res) => {
            //         console.log("+++++++++++++++++++++++")
            //         console.log(res.data.users)
            //         console.log("+++++++++++++++++++++++")
            //         if (res.data.success) {

            //             alert(" data recieved");
            //             state.requests =await res.data.users
            //             console.log("===================")
            //             console.log(state.requests)
            //             console.log("====================")
            //             return{
            //                 ...state,
            //                 requests:res.data.users
            //             }
            //         }
            //     })
            //     .catch((err) => {
            //         message.error("err at admin reducer get requests case 60")
            //     })
            return {
                ...state
            }

        }

        case "GETUSERSLIST": {
            // console.log(state.localStorageData);
            // state.userList = (JSON.parse(localStorage.getItem("admin"))).users
            console.log(action.payload)
            state.userList=action.payload
            return {
                ...state,
            }
        }
        case "ACCEPT": {
            console.log("entered accept")
            // let l = JSON.parse(localStorage.getItem("admin"));
            // if (action.payload.value === true) {
            //     console.log("entered accept if")
            //     let l2 = l.requests.splice(action.payload.index, 1);
            //     // l.requests.splice(action.payload.index, 1);
            //     console.log(l.requests)
            //     let l3 = JSON.parse(localStorage.getItem(l2[0]))
            //     l3.accept = true;
            //     localStorage.setItem(l2[0], JSON.stringify(l3))
            //     console.log(l2)
            //     l.users = (l.users.concat(l2))
            //     console.log(l.users);
            //     localStorage.setItem("admin", JSON.stringify(l))
            //     state.localStorageData = l
            //     return {
            //     ...state,
            //     localStorageData: l,
            // }
            // }
            return {
                ...state,
            }
        }
        case "DECLINE": {
            // let l = JSON.parse(localStorage.getItem("admin"));
            // if (action.payload.value === true) {
            //     console.log("entered decline if")
            //     let l2 = l.requests.splice(action.payload.index, 1);
            //     // l.requests.splice(action.payload.index, 1);
            //     localStorage.removeItem(l2[0])
            //     localStorage.setItem("admin", JSON.stringify(l))
            //     return {
            //         ...state,
            //         localStorageData: l,
            //     }
            // }
            return {
                ...state,
            }
        }
        default: return state;
    }
}

export default reducer;
