let initialState = {
    userName: '',
    password: '',
    userPosts:'',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETUSERPOSTS":{
            state.userPosts=(JSON.parse(localStorage.getItem(state.userName))).posts
            return{
                ...state
            }
        }
        case "SETUSERNAME":{
            state.userName=action.payload;
            return{
                ...state,
                userName:state.userName
            }
        }
        case "UPLOADNEWPOST":{
            let l=JSON.parse(localStorage.getItem(state.userName))
            state.userPosts=state.userPosts.concat(action.payload)
            l.posts=state.userPosts
            localStorage.setItem(state.userName,JSON.stringify(l))
            console.log(action.payload)
            return{
                ...state,
                userPosts:state.userPosts,
            }
        }
        default: return state;
    }
}

export default reducer;
