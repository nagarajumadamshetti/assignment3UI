const initialState = {
    userName: 'adsf',
    password: '',
    localStorageData: '',
    success: false
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
            let l=JSON.parse(localStorage.getItem(state.userName));
            state.role=l.role
            
            console.log(state.role)
            if(!l){
                console.log("p1")
                return{
                    ...state,
                    uSuccess:false
                }
            }
            else{
                console.log('p2')
                if(l.password===state.password)
                {
                    console.log("p3")
                    if(l.role==="admin"){
                        localStorage.setItem("role","admin")
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:true,
                            role:l.role,
                            
                        }
                    }
                    else if(l.accept)
                    {
                        console.log(l.role)
                        console.log("p4")
                        localStorage.setItem("role","user")
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:true,
                            role:l.role,
                        }
                    }
                    else{
                        console.log("p4-1")
                        return{
                            ...state,
                            uSuccess:true,
                            pSuccess:true,
                            success:false
                        }
                    }
                }
                else{
                    console.log("p5")
                    return{
                        ...state,
                        uSuccess:true,
                        pSuccess:false
                    }
                }
            }
            console.log("p6")
            return {
                ...state,
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
            return {
                ...state,
                localStorageData: localStorage.setItem(state.userName, JSON.stringify(action.payload))
            }
        }
        
        
        default: return state;
    }
}
export default reducer;