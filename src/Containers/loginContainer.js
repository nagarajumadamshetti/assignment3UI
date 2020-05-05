import LoginAPI from '../API/loginAPI';

export const onNameChange = (value) => {
}
export const onPasswordChange = (value) => {

}

export const onSubmitLogin = async (value) => {
    try {
        let res = await LoginAPI(value)
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const setUserName = (value) => {

}

export const setUserUserName = (value) => {

}