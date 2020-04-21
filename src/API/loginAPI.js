import axios from '../axios';
const loginAPI = async (value) => {
    try {
        return await axios.post('/login', {
            userName: value.userName,
            password: value.password
        })
    } catch (error) {
        console.log(error);
    }
    // await axios.post('/login', {
    //     userName: value.userName,
    //     password: value.password
    // })
    //     .then((res) => {
    //         if (res.data.success) {
    //             return {
    //                 data: res.data,
    //                 success: res.data.success
    //             }
    //         }
    //         else {
    //             return {
    //                 success: res.data.success
    //             }
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         return {
    //             err,
    //             success: false
    //         };
    //     });
}
export default loginAPI;