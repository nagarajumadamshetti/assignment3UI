import axios from '../axios';
const followAndUnFollowAPI = async (v) => {
    let value = v;
    if (value.followed) {
        await axios.post('/unFollow', {
            loggedUserIdToken: localStorage.getItem("token"),
            userName: value.userName
        })
            .then((res) => {
                if (res.data.success) {
                    return {
                        data: {
                            following: (res.data.following),
                            followers: (res.data.followers),
                        },
                        success: res.data.success
                    }
                }
                else {
                    return {
                        success: res.data.success
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                return {
                    success: false,
                    err
                }
            })
    }
    else {
        await axios.post("/follow", {
            loggedUserIdToken: localStorage.getItem("token"),
            userName: value.userName
        })
            .then((res) => {
                if (res.data.success) {
                    return {
                        data: {
                            following: (res.data.following),
                            followers: (res.data.followers),
                        },
                        success: res.data.success
                    }
                }
                else {
                    return {
                        success: res.data.success
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                return {
                    success: false,
                    err
                }
            })
    }
}
export default followAndUnFollowAPI;
