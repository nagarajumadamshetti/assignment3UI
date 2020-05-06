
export const onChangeToggleAction = () => {
    return {
        type: "TOGGLEUSER"
    }
}
export const setUserUserNameAction = (value) => {
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

export const onGetFollowRequestsAction = (value) => {
    return {
        type: "GETFOLLOWREQUESTS",
        payload: value,
    }
}

export const onGetSignUpRequestsAction =(value) => {
    console.log("ongetsignuprequestsAction at actions ")
    return {
        type: "GETSIGNUPREQUESTS",
        payload: value
    }
}

