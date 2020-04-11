const initialState = {
    userName: 'adf',
    password: '',
    role: '',
    email: '',
    phone: '',
    localStorageData: '',
    success: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            return {
                ...state,
                userName: action.payload
            }
        }

        case "PASSWORDCHANGE": {
            return {
                ...state,
                password: action.payload
            }
        }
        case "SUBMIT": {
            return {
                ...state,
                // userName: '',
                // password: ''
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                userName: '',
                password: ''
            }
        }
        case "GET": {
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(state.userName))
            }
        }
        case "SET": {
            if (state.role === "user") {
                let l = JSON.parse(localStorage.getItem("admin"));
                l.requests.push(state.userName);
                localStorage.setItem("admin", JSON.stringify(l));
                state.localStorageData=localStorage.setItem(state.userName, JSON.stringify(action.payload))
            }
            return {
                ...state,

            }
        }
        case "EMAIL": {

            return {
                ...state,
                email: action.payload
            }
        }
        case "PHONE": {

            return {
                ...state,
                phone: action.payload
            }
        }
        case "ROLE": {

            return {
                ...state,
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