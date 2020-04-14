import React, { Component } from 'react';

import { Button, Drawer, notification, } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import UserList from '../admin/userList';
import UserRequests from '../admin/userRequests'
import { connect } from "react-redux";
import '@ant-design/icons';


import {
    InstagramOutlined,
    UserOutlined,
    ContainerOutlined,
    MenuOutlined,
    SmileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Profile from '../user/profile';
import Search from '../user/search';
import Timeline from '../user/timeline';
import FollowRequests from '../user/followRequest';

import Logout from '../Logout/logout';
import { resolveOnChange } from 'antd/lib/input/Input';

class SideDrawer extends Component {

    state = {
        collapsed: false,
        visible: false,
        placement: 'left'
    };
    showDrawer = () => {
        this.setState({
            visible: true,

        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    sleep = async (time) => {
        await new Promise((resolve) => { setTimeout(resolve, time) })
    }
    componentDidMount = async () => {
        console.log(this.props.loggedUserName)
        await this.props.setUserName(this.props.loggedUserName);
        console.log(this.props.userName);
        // console.log(this.props.loggedUserName)
        // console.log(this.props.userName)
        if (localStorage.getItem("role") === "user") {
            await this.props.onGetFollowRequests(this.props.loggedUserName);
            if (this.props.followRequests)

                await this.props.followRequests.map(async (el, key) => {
                    return await this.sleep(2000).then(() =>
                        notification.open({
                            message: 'New follow Request  ',
                            description:
                                `from ${el}`,
                            icon: <SmileOutlined style={{ color: '#308ee9' }} />,
                        })
                    );

                })
        }
        else {
            await this.props.onGetSignUpRequests();
            console.log(this.props.signUpRequests)
            if (this.props.signUpRequests) {
                console.log(this.props.signUpRequests)
                this.props.signUpRequests.map((el, key) => {
                    // setTimeout(500);
                    return (
                        notification.open({
                            message: 'New Sign Up Request  ',
                            description:
                                `from ${el["userName"]}`,
                            // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        }))
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {
        console.log("sidedrawer cwum");
    }
    hideUserLinks = async () => {
        console.log("entered hide user links")
        if (this.state.visible === this.props.toggle) {
            this.props.onChangeToggle();
            await this.props.setUserName("admin");
            console.log(this.props.userName)
        }       // this.setState({ toggle: !this.state.toggle })

    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} style={{ marginRight: 1300 }}>
                    {
                        this.props.toggle ?
                            <MenuFoldOutlined /> :
                            <MenuUnfoldOutlined />
                    }
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {
                        localStorage.getItem("role") === "admin" ?
                            (
                                <div>
                                    <Link to="/admin/userList" onClick={this.hideUserLinks}><InstagramOutlined />UserLists</Link>
                                    <br></br>
                                    <br></br>
                                    <Link to="/admin/userRequests"><UserOutlined />Requests</Link>
                                    {/* {
                                        this.props.signUpRequests ?
                                            this.props.signUpRequests.map((el, key) => {
                                                return (
                                                    notification.open({
                                                        message: 'New Sign Up Request  ',
                                                        description:
                                                            `from ${el}`,
                                                        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                                                    }))
                                            })
                                            : null
                                    } */}
                                </div>
                            )
                            :
                            (
                                <div>
                                    <Link to={`/user/${this.props.loggedUserName}/profile`}><InstagramOutlined />Profile</Link>
                                    <br></br>
                                    <br></br>
                                    <Link to={`/user/${this.props.loggedUserName}/search`}><UserOutlined />Search</Link>
                                    <br></br>
                                    <br></br>
                                    <Link to={`/user/${this.props.loggedUserName}/timeline`}><ContainerOutlined />Timeline</Link>
                                    <br></br>
                                    <br></br>
                                    <Link to={`/user/${this.props.loggedUserName}/followRequests`}><MenuOutlined />FollowRequests</Link>
                                    {/* {
                                        this.props.followRequests ?
                                            this.props.followRequests.map((el, key) => {
                                                return (
                                                    notification.open({
                                                        message: 'New follow Request  ',
                                                        description:
                                                            `from ${el}`,
                                                        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                                                    }))
                                            })
                                            : null
                                    } */}
                                </div>
                            )}
                </Drawer>
                {/* <Logout/> */}
                <Route exact component={Logout} />
                <Switch>
                    {/* {console.log("entered switch")} */}

                    <Route path="/admin/userList" component={UserList} />
                    <Route path="/admin/userRequests" component={UserRequests}></Route>
                    <Route path="/user/:id/profile" component={Profile}></Route>
                    <Route path="/user/:id/search" component={Search}></Route>
                    <Route path="/user/:id/timeline" component={Timeline}></Route>
                    <Route path="/user/:id/followRequests" component={FollowRequests}></Route>
                    {/* <Route path="/admin/userList/:id" exact component={UserPageAtAdmin}/> */}
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle: state.adminReducer.toggle,
    signUpRequests: state.adminReducer.requests,
    loggedUserName: state.loginReducer.userName,
    userName: state.loginReducer.userName,
    followRequests: state.userReducer.followRequests
})
const mapDispatchToProps = dispatch => {
    return {
        onChangeToggle: () =>
            dispatch({
                type: "TOGGLEUSER"
            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
        onGetFollowRequests: (value) =>
            dispatch({
                type: "GETFOLLOWREQUESTS",
                payload: value,
            }),
        onGetSignUpRequests: () =>
            dispatch({
                type: "GETSIGNUPREQUESTS"
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));

// export default SideDrawer;