import GetUserListAPI from '../../API/getUsersListAPI'

export const onGetList = async () => {
    try {
        let res = await GetUserListAPI()
        if (res.data.success) {
            return res.data.users
        }
    } catch (error) {
        console.log(error)
    }
}

export const onChangeToggle = () => {
}

export const setUsersUserName = (value) => {
}

export const setUserName = (value) => {
}



// import UserList from '../../Components/admin/userList'
// import { message } from 'antd';
// import { connect } from "react-redux";

// import GetUserListAPI from '../../API/getUsersListAPI'

// const mapStateToProps = state => ({
//     userList: state.adminReducer.userList,
//     toggle: state.adminReducer.toggle,
//     userName: state.loginReducer.userName,
// })
// const mapDispatchToProps = dispatch => {
//     return {

//         onGetList: async () => {
//             try {
//                 let res = await GetUserListAPI()
//                 if (res.data.success) {
//                     dispatch({
//                         type: "GETUSERSLIST",
//                         payload: res.data.users
//                     })
//                 }
//             } catch (error) {
//                 console.log(error)
//             }

//         },
//         onChangeToggle: () =>
//             dispatch({
//                 type: "TOGGLEUSER"
//             }),
//         setUsersUserName: (value) =>
//             dispatch({
//                 type: "SETUSERUSERNAME",
//                 payload: value
//             }),
//         setUserName: (value) =>
//             dispatch({
//                 type: "SETUSERNAME",
//                 payload: value
//             }),
//     }
// }
// export default (connect(mapStateToProps, mapDispatchToProps)(UserList));