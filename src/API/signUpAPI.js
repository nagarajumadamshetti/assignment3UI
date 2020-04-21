import axios from '../axios';
const signUpAPI = async (value) => {
    try {
        return await axios.post('/signUp', {
            userName: value.userName,
            password: value.password,
            role: value.role,
            email: value.email,
            accepted: false,
            phone: value.phone,
        })
    } catch (error) {
        console.log(error);
    }
    // await axios.post('/signUp', {
    //     userName: value.userName,
    //     password: value.password,
    //     role: value.role,
    //     email: value.email,
    //     accepted: false,
    //     phone: value.phone,
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
export default signUpAPI;