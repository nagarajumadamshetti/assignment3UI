let initialState = {
    userName: '',
    password: '',
    userPosts: '',
    description: '',
    followers: '',
    following: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOLLOWANDUNFOLLOW": {
            let searchedUser = JSON.parse(localStorage.getItem(action.payload));
            if(!searchedUser)
            {
                return{
                    ...state
                }
            }
            let loggedUser = JSON.parse(localStorage.getItem(state.userName));
            if (action.payload === state.userName) {
                return {
                    ...state
                }
            }
            if (searchedUser) {
                console.log(action.payload)
                if (searchedUser.followers.find(element => element === state.userName)) {
                    let index = searchedUser.followers.indexOf(state.userName);
                    if (index > -1) {
                        searchedUser.followers.splice(index, 1);

                    }
                    index = loggedUser.following.indexOf(action.payload)
                    if (index > -1) {
                        loggedUser.following.splice(index, 1);
                    }
                }
                else {

                    searchedUser.followers.push(state.userName)
                    loggedUser.following.push(action.payload)
                }
                console.log(searchedUser.followers)
                state.followers = searchedUser.followers;
                state.following = searchedUser.following
            }
            else {
                state.followers = [];
                state.following = [];
            }
            localStorage.setItem(action.payload, JSON.stringify(searchedUser));
            localStorage.setItem(state.userName, JSON.stringify(loggedUser));
            return {
                ...state
            }
        }
        case "GETUSERFOLLOWERSANDFOLLOWING": {
            let l = JSON.parse(localStorage.getItem(action.payload))
            if (l) {
                console.log(l.followers)
                state.followers = l.followers;
                state.following = l.following
            }
            else {
                state.followers = [];
                state.following = [];
            }
            return {
                ...state
            }
        }
        case "GETUSERPOSTS": {

            let l = JSON.parse(localStorage.getItem(action.payload))
            if (l) {
                state.userPosts = l.posts
            }
            else {
                state.userPosts = null;
            }
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
