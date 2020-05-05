export const onNameChangeAction = (value) => {
    return {
        type: "USERNAMECHANGE",
        payload: value
    }
}

export const onPasswordChangeAction = (value) => {
    return {
        type: "PASSWORDCHANGE",
        payload: value
    }
}

export const onSubmitLoginAction = async (data) => {
    return {
        type: "SUBMITLOGIN",
        payload: data
    }
}

export const setUserNameAction = (value) => {
    return {
        type: "SETUSERNAME",
        payload: value
    }
}

export const setUserUserNameAction = (value) => {
    return {
        type: "SETUSERUSERNAME",
        payload: value
    }
}