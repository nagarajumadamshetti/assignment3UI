import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer, notification, } from 'antd';

import { Route, Link, Switch } from 'react-router-dom';

import UserList from '../admin/userList';
import UserRequests from '../admin/userRequests';
import UserPageAtAdmin from '../admin/userPageAtAdmin';

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

import { onGetFollowRequests, onGetSignUpRequests } from '../../Containers/sideDrawercontainer';

import { onChangeToggleAction, setUserUserNameAction, setUserNameAction, onGetFollowRequestsAction, onGetSignUpRequestsAction } from '../../Actions/sideDrawerActions';

const SideDrawer = () => {
    const dispatch = useDispatch();

    const [collapsed, ChangeCollapsed] = useState(false);
    const [visible, ChangeVisible] = useState(false);

    const toggle = useSelector((state) => state.adminReducer.toggle);
    let [signUpRequests, ChangeSignUpRequests] = useState([])
    let [followRequests, ChangeFollowRequests] = useState([]);
    const loggedUser = useSelector((state) => state.loginReducer.userName);


    useEffect(() => {
        console.log("sideDrawer useEffect")
        if (localStorage.getItem("role") === "user") {
            userNotifications();
        }
        else {
            adminNotifications();
        }
    }, []);

    // useEffect(() => {
    //     // Should not ever set state during rendering, so do this in useEffect instead.
    //     // onGetFollowRequests(loggedUserName).then((res)=>{
    //     //     ChangeFollowRequests(res);
    //     // });
    //     console.log("adfadadfaf")
    //     onGetSignUpRequests().then((res) => {
    //         ChangeSignUpRequests(signUpRequests.concat(res));
    //         console.log(res)
    //     })
    // }, []);

    const showDrawer = () => {
        ChangeVisible(true);
    };

    const onClose = () => {
        ChangeVisible(false);
    };
    const toggleCollapsed = () => {
        ChangeCollapsed(!collapsed);
    };

    const userNotifications = async () => {
        let res = await onGetFollowRequests(loggedUser);
        // ChangeFollowRequests(res)
        followRequests = res;
        if (followRequests)
            followRequests.map(async (el, key) => {
                return await sleep(2000).then(() =>
                    notification.open({
                        message: 'New follow Request  ',
                        description:
                            `from ${el.followRequestUserName}`,
                        icon: <SmileOutlined style={{ color: '#308ee9' }} />,
                    })
                );
            })
    }
    const sleep = async (time) => {
        await new Promise((resolve) => { setTimeout(resolve, time) })
    }
    const adminNotifications = async () => {
        let res = await onGetSignUpRequests();
        console.log(signUpRequests);
        // ChangeSignUpRequests(res)
        signUpRequests = res;
        if (signUpRequests) {
            await signUpRequests.map((el, key) => {
                return sleep(2000).then(() =>
                    notification.open({
                        message: 'New Sign Up Request  ',
                        description:
                            `from ${el["userName"]}`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    }))
            })
        }
    }


    const hideUserLinks = async () => {
        if (visible === toggle) {
            await onChangeToggleAction();
            await setUserNameAction("admin");
        }
    }
    return (
        <div>
            <Button type="primary" onClick={showDrawer} style={{ marginRight: 1300 }}>
                {
                    toggle ?
                        <MenuFoldOutlined /> :
                        <MenuUnfoldOutlined />
                }
            </Button>
            <Drawer
                title="Basic Drawer"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                {
                    localStorage.getItem("role") === "admin" ?
                        (
                            <div>
                                <Link to="/admin/userList" onClick={hideUserLinks}><InstagramOutlined />UserLists</Link>
                                <br></br>
                                <br></br>
                                <Link to="/admin/userRequests"><UserOutlined />Requests</Link>
                            </div>
                        )
                        :
                        (
                            <div>
                                <Link to={`/user/${loggedUser.id}/profile`}><InstagramOutlined />Profile</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUser.id}/search`}><UserOutlined />Search</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUser.id}/timeline`}><ContainerOutlined />Timeline</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUser.id}/followRequests`}><MenuOutlined />FollowRequests</Link>
                            </div>
                        )}
            </Drawer>
            <Route exact component={Logout} />
            <Switch>
                <Route path="/admin/userList/:id" exact component={UserPageAtAdmin} />
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


export default SideDrawer;