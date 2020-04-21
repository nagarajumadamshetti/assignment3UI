import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, message } from 'antd';
// import { Switch } from 'react-router-dom';
import axios from '../../axios';
import { Redirect } from 'react-router';
class Login extends Component {
    componentDidMount() {
        // console.log("entered login cdm")
        // this.props.onNameChange('');
        // this.props.onPasswordChange('');
    }
    componentDidUpdate(prevProps, prevState) {

    }
    onFinish = async (values) => {
        // console.log('Success:', values);
        // console.log("submitted")
        await this.props.onSubmitLogin({
            userName: this.props.userName,
            password: this.props.password
        });
        if (!this.props.uSuccess) {
            message.warning("username doesnot exist");
            return;
        }
        if (!this.props.pSuccess) {
            message.warn("password incorrect");
            return;
        }
        if (!this.props.success) {
            message.warning("admin didn't accept");
            return;
        }

        // message.success("successfully logged in", 1);
        this.props.setUserName(this.props.userName);
        if (this.props.role === "user") {
            this.props.setUserUserName(this.props.userName);
        }
        // if (this.props.role === "admin") {
        //     console.log("entered if")
        //         <Route to = "/admin" >
        //             <Home></Home> 
        //     </Route >
        //  }
    };

    onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };
    handleNameChange = (e) => {
        this.props.onNameChange(e.target.value);
        // console.log("name handler")
    }
    handlePasswordChange = (e) => {
        this.props.onPasswordChange(e.target.value);
    }
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        // let role=this.props.role
        return (
            <div >
                {this.props.success ? (
                    this.props.role === "admin" ?
                        <Redirect to="/admin"></Redirect>
                        :
                        <Redirect to={`/user/${this.props.userName}`}></Redirect>
                ) : (
                        <div className="container"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "100px",
                                marginRight: "500px"
                            }}
                        >

                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <h1>Sign In</h1>
                                <Form.Item
                                    onChange={this.handleNameChange}
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    onChange={this.handlePasswordChange}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" >Submit</Button>
                                </Form.Item>
                            </Form>
                        </div>)}
                {/* <Route exact component={Logout}/> */}
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
        onSubmitLogin: async (value) => {
            await axios.post('/login', {
                userName: value.userName,
                password: value.password
            })
                .then((res) => {
                    dispatch({
                        type: "SUBMITLOGIN",
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                    message.error("error at onSubmitLogin diapatcher");
                })
        },
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
        setUserUserName: (value) => {
            dispatch({
                type: "SETUSERUSERNAME",
                payload: value
            })
        },
    };
};
const mapStateToProps = (state) => ({
    userName: state.loginReducer.userName,
    password: state.loginReducer.password,
    localStorageData: state.loginReducer.localStorageData,
    success: state.loginReducer.success,
    uSuccess: state.loginReducer.uSuccess,
    pSuccess: state.loginReducer.pSuccess,
    role: state.loginReducer.role,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);