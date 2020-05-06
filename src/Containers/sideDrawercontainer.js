import { message } from 'antd';
import GetFollowRequestsAPI from '../API/getFollowRequestsAPI';
import GetSignUpRequestsAPI from '../API/getSignUpRequestsAPI';


export const onChangeToggle = () => { }
export const setUserUserName = (value) => { }
export const setUserName = (value) => { }

export const onGetFollowRequests = async (value) => {
    try {
        let v = value
        let res = await GetFollowRequestsAPI(v);
        if (res.data.success) {
            return res.data.followRequests
        }
    } catch (error) {
        console.log(error)
    }
}
export const onGetSignUpRequests = async () => {
    try {
        let res = await GetSignUpRequestsAPI()
        if (res.data.success) {
            return res.data.users
        }
    } catch (error) {
        console.log(error)
    }
}
