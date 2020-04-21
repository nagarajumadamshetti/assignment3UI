import axios from '../axios';
const declineSignUpRequestAPI = async (value) => {

    await axios.delete('/admin/userRequests/decline', {
        data: {
            userName: value.userName,
        }
    })
        .then((res) => {
            if (res.data.success) {
                return {
                    // data: res.data.users,
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
            console.log(err)
            return {
                err,
                success: false
            };
        });
}
export default declineSignUpRequestAPI;
