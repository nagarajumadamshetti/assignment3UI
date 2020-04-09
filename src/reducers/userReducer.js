let initialState = {
    userName: '',
    password: '',
    userPosts: '',
    description: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETUSERPOSTS": {
            state.userPosts = (JSON.parse(localStorage.getItem(action.payload))).posts
            return {
                ...state
            }
        }
        case "SETUSERNAME": {
            state.userName = action.payload;
            return {
                ...state,
                userName: state.userName
            }
        }
        case "NEWDESCRIPTION": {
            console.log("entered new descriprion")
            console.log(action.payload)
            state.description = action.payload;
            console.log(state.description)
            return {
                ...state,
                description: state.description
            }
        }
        case "UPLOADNEWPOST": {
            let l = JSON.parse(localStorage.getItem(state.userName))
            console.log(state.description)
            let d = { ...action.payload, description: state.description, likeCounter: [] }
            state.userPosts.push(d)
            // state.userPosts=state.userPosts.push(d)
            l.posts = state.userPosts
            localStorage.setItem(state.userName, JSON.stringify(l))
            console.log(action.payload);
            state.description = ''
            return {
                ...state,
                userPosts: state.userPosts,
            }
        }
        default: return state;
    }
}

export default reducer;
