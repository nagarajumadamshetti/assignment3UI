import axios from '../axios';
const signUpAPI = (value) => {
    return axios.post('/signUp', {
        userName: value.userName,
        password: value.password,
        role: value.role,
        email: value.email,
        accepted: false,
        phone: value.phone,
    });
}
export default signUpAPI;