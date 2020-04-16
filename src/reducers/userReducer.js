let initialState = {
    userName: '',
    password: '',
    userPosts: '',
    description: '',
    followers: '',
    following: '',
    searchValue: '',
    followRequests: '',
    likeCounter: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIKEUSERPOST": {
            let l = JSON.parse(localStorage.getItem(action.payload.postUserName))
            console.log(action.payload.key)
            console.log(action.payload.postUserName)
            let index = action.payload.key
            console.log(index)

            console.log("object   :   " + l.posts[index].likeCounter);
            let index2 = l.posts[index].likeCounter.indexOf(action.payload.presentUser)
            if (index2 > -1) {
                l.posts[index].likeCounter.splice(index2, 1);
            }
            else {
                l.posts[index].likeCounter.push(action.payload.presentUser);
            }
            console.log(l.posts)
            state.userPosts = l.posts
            localStorage.setItem(action.payload.postUserName, JSON.stringify(l))
            return {
                ...state,
            }
        }
        case "DELETEUSERPOST": {
            let l = JSON.parse(localStorage.getItem(state.userName))
            let index = action.payload.key
            console.log(index)
            l.posts.splice(index, 1)
            console.log(l.posts)
            state.userPosts = l.posts
            localStorage.setItem(state.userName, JSON.stringify(l))
            return {
                ...state,
            }
        }
        case "GETFOLLOWREQUESTS": {
            let l = JSON.parse(localStorage.getItem(action.payload))
            if (l)
                state.followRequests = l.followRequests
            return {
                ...state,
                localStorageData: JSON.parse(localStorage.getItem(action.payload)),
            }
        }
        case "ACCEPTFOLLOW": {
            console.log("entered accept")
            let l = JSON.parse(localStorage.getItem(state.userName));
            if (action.payload.value === true) {
                console.log("entered accept if")
                let l2 = l.followRequests.splice(action.payload.index, 1);
                // l.requests.splice(action.payload.index, 1);
                console.log(l.followRequests)

                l.followers = (l.followers.concat(l2))
                console.log(l.users);
                let l3 = JSON.parse(localStorage.getItem(l2[0]))
                l3.following.push(state.userName);
                localStorage.setItem(state.userName, JSON.stringify(l))
                localStorage.setItem(l2[0], JSON.stringify(l3))
                state.localStorageData = l;
                state.followRequests = l.followRequests;
                state.followers = l.followers
                return {
                    ...state,
                    localStorageData: l,
                }
            }
            return {
                ...state,
                localStorageData: l
            }
        }
        case "DECLINEFOLLOW": {
            let l = JSON.parse(localStorage.getItem(state.userName));
            if (action.payload.value === true) {
                console.log("entered decline if")
                let l2 = l.followRequests.splice(action.payload.index, 1);
                // l.requests.splice(action.payload.index, 1);
                // localStorage.removeItem(l2[0])
                localStorage.setItem(state.userName, JSON.stringify(l))
                state.followRequests = l.followRequests;
                state.followers = l.followers
                return {
                    ...state,
                    localStorageData: l,
                }
            }
            return {
                ...state,
                localStorageData: l
            }
        }
        case "SEARCHUSERNAME": {
            state.searchValue = action.payload;
            return {
                ...state
            }
        }
        case "FOLLOWANDUNFOLLOW": {
            // state.followers=action.payload.followers;
            // state.following=action.payload.following
            return {
                ...state
            }
            // let searchedUser = JSON.parse(localStorage.getItem(action.payload));
            // if (!searchedUser) {
            //     return {
            //         ...state
            //     }
            // }
            // let loggedUser = JSON.parse(localStorage.getItem(state.userName));
            // if (action.payload === state.userName) {
            //     return {
            //         ...state
            //     }
            // }
            // if (searchedUser) {
            //     console.log(action.payload)
            //     if (searchedUser.followers.find(element => element === state.userName)) {
            //         let index = searchedUser.followers.indexOf(state.userName);
            //         if (index > -1) {
            //             searchedUser.followers.splice(index, 1);

            //         }
            //         index = loggedUser.following.indexOf(action.payload)
            //         if (index > -1) {
            //             loggedUser.following.splice(index, 1);
            //         }
            //     }
            //     else {
            //         searchedUser.followRequests.push(state.userName);
            //         // localStorage.setItem("admin", JSON.stringify(l));
            //         // searchedUser.followers.push(state.userName)
            //         // loggedUser.following.push(action.payload)
            //     }
            //     console.log(searchedUser.followers)
            //     state.followers = searchedUser.followers;
            //     state.following = searchedUser.following;
            // }
            // else {
            //     state.followers = [];
            //     state.following = [];
            // }
            // localStorage.setItem(action.payload, JSON.stringify(searchedUser));
            // localStorage.setItem(state.userName, JSON.stringify(loggedUser));
            
        }
        case "GETUSERFOLLOWERSANDFOLLOWING": {
            state.followers=action.payload.followers;
            console.log(state.followers);
            state.following=action.payload.following;
            return {
                ...state
            }
        }
        case "GETUSERPOSTS": {
            console.log(state.userName)
            console.log("entered get user posts")
            console.log(action.payload)
            state.userPosts = action.payload;
            return {
                ...state,

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
            state.description = ''
            return {
                ...state,
            }
        }
        case "SETUSERUSERNAME":{
            state.userName=action.payload;
            return{
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
