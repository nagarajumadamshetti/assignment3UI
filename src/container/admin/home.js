import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component{
    componentDidMount() {
        
    }
    componentDidUpdate(prevProps, prevState) {
        
    }
    render(){
        return(
            <div>

            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onNameChange: (value) =>
            dispatch({
                type: "USERNAMECHANGE",
                payload: value
            }),
        onPasswordChange: (value) =>
            dispatch({
                type: "PASSWORDCHANGE",
                payload: value
            }),
        onLogout: () =>
            dispatch({
                type: "LOGOUT",
            }),
        getItem: () =>
            dispatch({
                type: "GET",
                // payload: this.props.userName
            }),
        setItem: (obj) =>
            dispatch({
                type: "SET",
                payload: obj
            }),
        validate: () =>
            dispatch({
                type: "VALIDATE",
            }),
        setEmail: (value) =>
            dispatch({
                type: "EMAIL",
                payload: value
            }),
        setRole: (value) =>
            dispatch({
                type: "ROLE",
                payload: value
            }),
        setPhone: (value) =>
            dispatch({
                type: "PHONE",
                payload: value
            }),
    };
};
const mapStateToProps = (state) => ({
    userName: state.signUpReducer.userName,
    password: state.signUpReducer.password,
    localStorageData: state.signUpReducer.localStorageData,
    phone: state.signUpReducer.phone,
    role: state.signUpReducer.role,
    email: state.signUpReducer.email,
    success: state.signUpReducer.success
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);