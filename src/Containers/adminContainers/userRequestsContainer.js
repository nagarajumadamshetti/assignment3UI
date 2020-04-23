import { message } from 'antd';
import { connect } from "react-redux";
import UserRequests from '../../Components/admin/userRequests';
import GetSignUpRequests from '../../API/getSignUpRequestsAPI';
import AcceptSignUpRequest from '../../API/acceptSignUpRequestAPI';
import DeclineSignUpRequest from '../../API/declineSignUpRequestAPI';


const mapDispatchToProps = dispatch => {
    return {

        onGetRequests: async () => {
            try {
                let res = await GetSignUpRequests()
                if (res.data.success) {
                    dispatch({
                        type: "GETSIGNUPREQUESTS",
                        payload: res.data.users
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },

        accept: async (value) => {
            try {
                let res = await AcceptSignUpRequest(value)
                if (res.data.success) {
                    dispatch({
                        type: "ACCEPT",
                        payload: value
                    })
                }
            } catch (error) {
                console.log(error)
            }

        },

        decline: async (value) => {
            try {
                let res = await DeclineSignUpRequest(value);
                if (res.data.success) {
                    dispatch({
                        type: "DECLINE",
                        payload: value
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
const mapStateToProps = state => ({
    requests: state.adminReducer.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);