const initialState = {
    userName: '',
    password: '',
    localStorageData: '',
    success: false,
    // uSuccess:'',
    // pSuccess:'',
    role:'',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            state.userName = action.payload
            return {
                ...state,
                userName: action.payload
            }
        }

        case "SETUSERNAME": {
            console.log("entered set user name")
            console.log(action.payload)
            state.userName = action.payload;
            console.log(state.userName)
            return {
                ...state,
            }
        }
        case "PASSWORDCHANGE": {
            return {
                ...state,
                password: action.payload
            }
        }
        case "SUBMITLOGIN": {
            // state.uSuccess=action.payload.uSuccess;
            // state.pSuccess=action.payload.pSuccess;
            // state.success=action.payload.success;
            // state.role=action.payload.role;
            state.role=action.payload.role;
            localStorage.setItem("role",state.role);
            return {
                ...state,
                uSuccess: action.payload.uSuccess,
                pSuccess: action.payload.pSuccess,
                success: action.payload.success,
                role: action.payload.role
            }
            // let l=JSON.parse(localStorage.getItem(state.userName))
            // if(!l){
            //     // alert("userdoesnot exist")
            //     return{
            //         ...state,
            //         uSuccess:false
            //     }                
            // }
            // state.role=l.role

            // console.log(state.role)
            // if(!l){
            //     console.log("p1")
            //     return{
            //         ...state,
            //         uSuccess:false
            //     }
            // }
            // else{
            //     console.log('p2')
            //     if(l.password===state.password)
            //     {
            //         console.log("p3")
            //         if(l.role==="admin"){
            //             localStorage.setItem("role","admin")
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:true,
            //                 role:l.role,

            //             }
            //         }
            //         else if(l.accept)
            //         {
            //             console.log(l.role)
            //             console.log("p4")
            //             localStorage.setItem("role","user")
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:true,
            //                 role:l.role,
            //             }
            //         }
            //         else{
            //             console.log("p4-1")
            //             return{
            //                 ...state,
            //                 uSuccess:true,
            //                 pSuccess:true,
            //                 success:false
            //             }
            //         }
            //     }
            //     else{
            //         console.log("p5")
            //         return{
            //             ...state,
            //             uSuccess:true,
            //             pSuccess:false
            //         }
            //     }
            // }
        }

        default: return state;
    }
}
export default reducer;