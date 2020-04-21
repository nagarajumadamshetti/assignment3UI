const initialState = {
    userName: '',
    password: '',
    localStorageData: '',
    success: false,
    // uSuccess:'',
    // pSuccess:'',
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
            state.role = action.payload.role;
            localStorage.setItem("role", state.role);
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                uSuccess: action.payload.uSuccess,
                pSuccess: action.payload.pSuccess,
                success: action.payload.success,
                role: action.payload.role
            }
        }

        default: return state;
    }
}
export default reducer;