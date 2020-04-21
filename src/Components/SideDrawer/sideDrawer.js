import React, { Component } from 'react';

import { Button, Drawer, notification, } from 'antd';

import { Route, Link, Switch } from 'react-router-dom';

import UserList from '../../Containers/adminContainers/userListContainer';
import UserRequests from '../../Containers/adminContainers/userRequestsContainer';

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

import Profile from '../../Containers/userContainers/profileContainer';
import Search from '../../Containers/userContainers/searchContainer';
import Timeline from '../../Containers/userContainers/timelineContainer';
import FollowRequests from '../../Containers/userContainers/followRequestsContainer';

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
    sleep = async (time) => {
        await new Promise((resolve) => { setTimeout(resolve, time) })
    }
    componentDidMount = async () => {
        await this.props.setUserName(this.props.loggedUserName);
        if (localStorage.getItem("role") === "user") {
            await this.props.onGetFollowRequests(this.props.loggedUserName);
            if (this.props.followRequests)

                await this.props.followRequests.map(async (el, key) => {
                    return await this.sleep(2000).then(() =>
                        notification.open({
                            message: 'New follow Request  ',
                            description:
                                `from ${el.followRequestUserName}`,
                            icon: <SmileOutlined style={{ color: '#308ee9' }} />,
                        })
                    );

                })
        }
        else {
            await this.props.onGetSignUpRequests();
            if (this.props.signUpRequests) {
                this.props.signUpRequests.map((el, key) => {
                    return (
                        notification.open({
                            message: 'New Sign Up Request  ',
                            description:
                                `from ${el["userName"]}`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        }))
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {
    }
    hideUserLinks = async () => {
        if (this.state.visible === this.props.toggle) {
            this.props.onChangeToggle();
            await this.props.setUserName("admin");
        }
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
                                </div>
                            )}
                </Drawer>
                <Route exact component={Logout} />
                <Switch>
                    <Route path="/admin/userList" component={UserList} />
                    <Route path="/admin/userRequests" component={UserRequests}></Route>
                    <Route path="/user/:id/profile" component={Profile}></Route>
                    <Route path="/user/:id/search" component={Search}></Route>
                    <Route path="/user/:id/timeline" component={Timeline}></Route>
                    <Route path="/user/:id/followRequests" component={FollowRequests}></Route>
                </Switch>
            </div>
        );
    }
}

export default SideDrawer;