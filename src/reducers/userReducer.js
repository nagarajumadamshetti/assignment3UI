let initialState = {
    userName: '',
    password: '',
    userPosts: '',
    description: '',
    followers: '',
    following: '',
    searchValue: '',
    followRequests: '',
    likeCounter: '',
    success: false,
    timeline:'',
    comments:'',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "SETGETUSERSUCCESS": {
            state.success = action.payload
            return {
                ...state
            }
        }
        case "LIKEUSERPOST": {
            return {
                ...state,
            }
        }
        case "DELETEUSERPOST": {
            return {
                ...state,
            }
        }
        case "GETFOLLOWREQUESTS": {
            state.followRequests = action.payload
            return {
                ...state,
            }
        }
        case "ACCEPTFOLLOW": {
            state.followRequests = action.payload
            return {
                ...state,
            }
        }
        case "DECLINEFOLLOW": {
            // state.followRequests = action.payload
            return {
                ...state,
            }
        }
        case "SEARCHUSERNAME": {
            state.searchValue = action.payload;
            return {
                ...state
            }
        }
        case "FOLLOWANDUNFOLLOW": {
            state.followers = action.payload.followers;
            state.following = action.payload.following
            return {
                ...state
            }

        }
        case "GETUSERFOLLOWERSANDFOLLOWING": {
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            return {
                ...state
            }
        }
        case "GETUSERPOSTS": {
            state.userPosts = action.payload;
            return {
                ...state,

            }
        }
        case "GETCOMMENTS": {
            state.comments = action.payload;
            return {
                ...state,

            }
        }
        case "GETTIMELINE": {
            state.timeline = action.payload;
            return {
                ...state,
            }
        }
        case "NEWDESCRIPTION": {
            state.description = action.payload;
            return {
                ...state,
                description: state.description
            }
        }
        case "UPLOADNEWPOST": {
            state.description = ''
            return {
                ...state,
            }
        }
        case "SETUSERUSERNAME": {
            console.log(action.payload)
            state.userName = action.payload;
            return {
                ...state
            }
        }
        default: {
            console.log("entered default user reducer")
            return state
        }
    }
}

export default reducer;
