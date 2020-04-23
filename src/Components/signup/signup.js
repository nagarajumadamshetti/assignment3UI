import React from 'react';
import "antd/dist/antd.css";
import { Button, Form, Input, Drawer, Dropdown, Menu, message } from 'antd';
import { connect } from "react-redux";
import { DownOutlined } from '@ant-design/icons';
import axios from '../../axios';
import { Link } from 'react-router-dom';

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
        if ((this.props.userName !== null || this.props.userName !== "") && (this.props.password !== null || this.props.password !== "")) {
            let obj = {
                userName: this.props.userName,
                password: this.props.password,
                email: this.props.email,
                role: this.props.role,
                phone: this.props.phone,
                accepted: false,
            }

            await this.props.validate();
            if (!this.props.success) {
                message.error("not valid at 32");
                return;
            }
            this.props.setItem(obj)
            message.success("signup successful");
            this.setState({ submit: true,})
        }
        else {
            message.warn("enter username and password", 3000);
        }
       await this.props.getItem();
    }
    
    handleEmail = (e) => {
        this.props.setEmail(e.target.value);
    }
    handlePhone = (e) => {
        this.props.setPhone(e.target.value);
    }
    handleRole = (e) => {
        this.props.setRole(e);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 5,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 12,
                },
            },
        };
        const menu = (
            <Menu >
                <Menu.Item key="0" value="admin" id="admin" onClick={() => this.handleRole("admin")} >
                    Admin
              </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" value="user" id="user" onClick={() => this.handleRole("user")}>
                    User
              </Menu.Item>
            </Menu>
        );
        return (
            <div>
                {this.state.toggle ? <div>
                    <div className="container">
                        <Form {...formItemLayout}>
                            <h1>Sign Up</h1>
                            <Form.Item
                                onChange={this.handleChange}
                                label="Username"
                                value={this.props.userName}
                                validateStatus={this.props.userNameValidated}
                                help="Should be between 4 to 30 characters"
                                hasFeedback
                            >
                                <Input id="success" />
                            </Form.Item>
                            <Form.Item
                                onChange={this.handlePassword}
                                value={this.props.password}
                                label="Password"
                                validateStatus={this.props.passwordValidated}
                                help="Atleast 8 characters"
                                hasFeedback
                            >
                                <Input id="success" />
                            </Form.Item>
                            <Form.Item
                                onChange={this.handleEmail}
                                value={this.props.email}
                                label="Email"
                                validateStatus={this.props.emailValidated}
                                help="Should contain characters "
                                hasFeedback
                            >
                                <Input id="success" />
                            </Form.Item>
                            <Form.Item
                                onChange={this.handlePhone}
                                value={this.props.phone}
                                label="Phonenumber"
                                validateStatus={this.props.phoneValidated}
                                help="Should be length of 10 only numbers allowed"
                                hasFeedback
                            >
                                <Input id="success" />
                            </Form.Item>
                            <Form.Item label="Role">
                                <Dropdown overlay={menu} >
                                    <Button >
                                        {
                                            this.props.roleValidated === "success" ?
                                                (this.props.role)
                                                :
                                                (<div>Role  <DownOutlined /></div>)
                                        }
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={this.handleSubmit} type="primary" size="middle">signUp</Button><br></br><br></br>
                                Already have an account<Link to="/login">Login Here</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div> : null}
            </div>
        );
    }
}
export default SignUp;