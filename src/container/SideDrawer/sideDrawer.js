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
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Profile from '../user/profile';
import Search from '../user/search';
import Timeline from '../user/timeline';
import FollowRequests from '../user/followRequest';

import Logout from '../Logout/logout';

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
    componentDidMount = async () => {
        console.log(this.props.loggedUserName)
        // await this.props.setUserName(this.props.loggedUserName);
        console.log(this.props.userName);
        // console.log(this.props.loggedUserName)
        // console.log(this.props.userName)
        if (localStorage.getItem("role") === "user") {
            await this.props.onGetFollowRequests(this.props.loggedUserName);
            this.props.followRequests.map((el, key) => {
                return (
                    notification.open({
                        message: 'New follow Request  ',
                        description:
                            `from ${el}`,
                        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    }))
            })
        }
        else {
            await this.props.onGetSignUpRequests();
            this.props.signUpRequests.map((el, key) => {
                return (
                    notification.open({
                        message: 'New Sign Up Request  ',
                        description:
                            `from ${el}`,
                        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    }))
            })
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
                <h1></h1>

                <Button type="primary" onClick={this.showDrawer} style={{ marginRight: 1300 }}>Menu</Button>
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
    userName: state.userReducer.userName,
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
                type: "GETREQUESTS"
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));

// export default SideDrawer;