export const changeToggle = () => {
    return {
        type: "TOGGLEUSER"
    }
}

export const setUsersUserNameAction = (value) => {
    return {
        type: "SETUSERUSERNAME",
        payload: value
    }
}

export const setUserNameAction = (value) => {
    return {
        type: "SETUSERNAME",
        payload: value
    }
}

export const getUserList = (users) => {
    return {
        type: "GETUSERSLIST",
        payload: users
    }
}

export const getSignUpRequests = (users) => {
    return {
        type: "GETSIGNUPREQUESTS",
        payload: users
    }
}

export const accept=(value)=>{
    return{
        type: "ACCEPT",
        payload: value
    }
}

export const decline=(value)=>{
    return{
        type: "DECLINE",
        payload: value
    }
}