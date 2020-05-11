import GetSignUpRequests from '../../API/getSignUpRequestsAPI';
import AcceptSignUpRequest from '../../API/acceptSignUpRequestAPI';
import DeclineSignUpRequest from '../../API/declineSignUpRequestAPI';


export const onGetRequests = async () => {
    try {
        let res = await GetSignUpRequests()
        if (res.data.success) {
            return res.data.users;
        }
    } catch (error) {
        console.log(error)
    }
}


export const accept = async (value) => {
    try {
        return await AcceptSignUpRequest(value)
    } catch (error) {
        console.log(error)
    }
}


export const decline = async (value) => {
    try {
        return await DeclineSignUpRequest(value);
    } catch (error) {
        console.log(error)
    }
}

