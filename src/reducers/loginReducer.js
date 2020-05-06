const initialState = {
    userName: '',
    password: '',
    localStorageData: '',
    success: false,
    uSuccess:false,
    pSuccess:false,
    role: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            state.userName = action.payload
            return {
                ...state,
            }
        }

        case "SETUSERNAME": {
            // console.log(action.payload);
            console.log("login reducer set user name  :  "+action.payload)
            state.userName = action.payload;
            return {
                ...state,
            }
        }

        case "PASSWORDCHANGE": {
            state.password = action.payload
            return {
                ...state,
            }
        }
        case "SUBMITLOGIN": {
            if(action.payload)
            state.role = action.payload.role;
            localStorage.setItem("role", state.role);
            if(action.payload){
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                uSuccess: action.payload.uSuccess,
                pSuccess: action.payload.pSuccess,
                success: action.payload.success,
                }}
        }

        default: return state;
    }
}
export default reducer;