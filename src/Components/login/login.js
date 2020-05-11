import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Redirect } from 'react-router';
import { onNameChangeAction, onPasswordChangeAction, onSubmitLoginAction, setUserNameAction, setUserUserNameAction } from '../../Actions/loginActions';
import { onSubmitLogin } from '../../Containers/loginContainer';

const useLogin = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.loginReducer.userName);
    const password = useSelector((state) => state.loginReducer.password);
    const role = useSelector((state) => state.loginReducer.role);
    const [redirect, SetRedirect] = useState(false);

    const useOnFinish = async (values) => {

        let res = await onSubmitLogin({
            userName: userName,
            password: password
        })



        if (!res.uSuccess) {
            message.warning("username doesnot exist");
            return;
        }

        if (!res.pSuccess) {
            message.warn("password incorrect");
            return;
        }

        if (!res.success) {
            message.warning("admin didn't accept");
            return;
        }

        await dispatch(onSubmitLoginAction(res));
        SetRedirect(true);

        console.log(userName)
        await dispatch(setUserNameAction(res.users));
        if (res.role === "user") {
            await dispatch(setUserUserNameAction(res.users));
        }
    };

    const onFinishFailed = errorInfo => {

    };
    const handleNameChange = (e) => {
        dispatch(onNameChangeAction(e.target.value));
    }

    const handlePasswordChange = (e) => {
        dispatch(onPasswordChangeAction(e.target.value));
    }

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
        <div >
            {redirect ? (
                role === "admin" ?
                    <Redirect to="/admin"></Redirect>
                    :
                    <Redirect to={`/user/${userName}`}></Redirect>
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
                            onFinish={useOnFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <h1>Sign In</h1>
                            <Form.Item
                                onChange={handleNameChange}
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
                                onChange={handlePasswordChange}
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
                )
            }
        </div>

    );
}

export default useLogin;