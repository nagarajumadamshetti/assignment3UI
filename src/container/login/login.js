import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox } from 'antd'
class Login extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    onFinish = async(values) => {
        console.log('Success:', values);
        console.log("submitted")
        await this.props.onSubmit();
        if(!this.props.uSuccess){
            alert("username doesnot exist");
            return;
        }
        if(!this.props.pSuccess){
            alert("password incorrect");
            return;
        }
        if(!this.props.success){
            alert("admin didn't accept");
            return;
        }
        alert("successfully logged in");
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    handleNameChange = (e) => {
        this.props.onNameChange(e.target.value);
        console.log("name handler")
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
        return (
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
            onSubmit:()=>
            dispatch({
                type:"SUBMIT"
            })
    };
};
const mapStateToProps = (state) => ({
    userName: state.loginReducer.userName,
    password: state.loginReducer.password,
    localStorageData: state.loginReducer.localStorageData,
    success: state.loginReducer.success,
    uSuccess: state.loginReducer.uSuccess,
    pSuccess: state.loginReducer.pSuccess,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);