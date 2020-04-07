import React from 'react';
import "antd/dist/antd.css";
import { Button } from 'antd';
import { connect } from "react-redux";
// import UserHome from './user/userHome';
import {Router,Link } from 'react-router-dom';

class SignUp extends React.Component {
    state = {
        submit: false,
        toggle: true,
    }
    handleChange = (e) => {
        this.props.onNameChange(e.target.value)
    }
    handlePassword = (e) => {
        this.props.onPasswordChange(e.target.value)
    }
    handleSubmit = async () => {
        if ((this.props.userName !== null||this.props.userName !== "") && (this.props.password !== null||this.props.password !== "")) {
            let obj = {
                username: this.props.username,
                password: this.props.password,
                email:this.props.email,
                role:this.props.role,
                phone:this.props.phone,
                posts:[],
                accept:false,
                followers:[],
                following:[]
            }
            await this.props.validate();
            console.log(this.props.success);
            console.log(this.props.userName);
            if (!this.props.success) {
                alert("not valid");
                return;
            }
            await this.props.getItem();
            if (!this.props.localStorageData&&this.props.role!=="admin") {
                this.props.setItem(obj)
            }
            else{
                obj={
                    username: this.props.username,
                password: this.props.password,
                email:this.props.email,
                role:this.props.role,
                phone:this.props.phone,
                users:[],//accepted users
                requests:[]//new users
                }
                this.props.setItem(obj)
            }
            alert("signup successful", 1000);
            this.setState({ submit: true, toggle: false })
        }
        else {
            alert("enter username and password", 3000);
            // this.props.onSubmit()
        }
    }
    handleLogout = () => {
        this.setState({ submit: false, toggle: true })
        this.props.onLogout()
        alert("logout successful", 1000);
    }
    handleEmail = (e) => {
        this.props.setEmail(e.target.value);
    }
    handlePhone = (e) => {
        this.props.setPhone(e.target.value);
    }
    handleRole = (e) => {
        this.props.setRole(e.target.value);
    }
    render() {
        return (
            <div>
                {this.state.toggle ? <div>
                    <div className="container">
                        <h1 >Sign Up</h1>
                        <form>
                            <input type="text" placeholder="username" onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <input type="password" className="form-control" placeholder="password" onChange={this.handlePassword} value={this.props.password} />
                            <br></br>
                            <br></br>
                            <input type="tel" className="form-control" placeholder="phone number" onChange={this.handlePhone} value={this.props.phone} />
                            <br></br>
                            <br></br>
                            <input type="email" className="form-control" placeholder="email" onChange={this.handleEmail} value={this.props.email} />
                            <br></br>
                            <br></br>
                            <select onChange={this.handleRole} value={this.props.role} >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <br></br>
                            <br></br>
                            <Button onClick={this.handleSubmit} type="primary" size="middle">signUn</Button>
                            <br></br>
                            <br></br>
                            Already a user <Link to="/login" >Login Here</Link>
                        </form>
                    </div>

                </div> : null}
                {/* {this.state.submit ? <UserHome logout={this.handleLogout}></UserHome> : null} */}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);