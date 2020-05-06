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
    const [collapsed, ChangeCollapsed] = useState(false);
    const [visible, ChangeVisible] = useState(false);
    const [placement, ChangePlacement] = useState('left');
    const userList = useSelector((state) => state.adminReducer.userList)
    const toggle = useSelector((state) => state.adminReducer.toggle);
    let [signUpRequests, ChangeSignUpRequests] = useState([])
    let [followRequests,ChangeFollowRequests]=useState([]);
    //  useSelector((state) => state.adminReducer.requests);
    const loggedUserName = useSelector((state) => state.loginReducer.userName);
    // const followRequests = useSelector((state) => state.userReducer.followRequests);
    const userName = useSelector((state) => state.loginReducer.userName);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("sideDrawer useEffect")
        if (localStorage.getItem("role") === "user") {
            userNotifications();
        }
        else {
            console.log("admin Notifications")
            adminNotifications();
        }
    }, [])

    useEffect(() => {
        console.log(signUpRequests,followRequests)
    }, [signUpRequests,followRequests])

    // state = {
    //     collapsed: false,
    //     visible: false,
    //     placement: 'left'
    // };

    const showDrawer = () => {
        ChangeVisible(true);
        // this.setState({
        //     visible: true,
        // });
    };

    const onClose = () => {
        ChangeVisible(false);
        // this.setState({
        //     visible: false,
        // });
    };
    const toggleCollapsed = () => {
        ChangeCollapsed(!collapsed);
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
    };

    const userNotifications = async () => {
        let res = await onGetFollowRequests(loggedUserName);
        followRequests=res;
        // await dispatch(async () => await onGetFollowRequestsAction(res))
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
  const  sleep = async (time) => {
        await new Promise((resolve) => { setTimeout(resolve, time) })
    }
    const adminNotifications = async () => {
        console.log("admin notifi p1")
        let res = await onGetSignUpRequests();
        console.log(res);
        await ChangeSignUpRequests(res)
        // await dispatch(async()=>await onGetSignUpRequestsAction(res)); 
        //   console.log(signUpRequests)
        signUpRequests = res
        if (signUpRequests) {
            await signUpRequests.map((el, key) => {
                return  sleep(2000).then(() =>
                    notification.open({
                        message: 'New Sign Up Request  ',
                        description:
                            `from ${el["userName"]}`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    }))
            })
        }
    }

    // componentDidMount = () => {

    //     if (localStorage.getItem("role") === "user") {
    //         // await this.props.setUserUserName(this.props.loggedUserName);
    //         this.userNotifications();
    //     }
    //     else {
    //         // await this.props.setUserName(this.props.loggedUserName);
    //         this.adminNotifications();
    //     }
    // }

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
                                <Link to={`/user/${loggedUserName}/profile`}><InstagramOutlined />Profile</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUserName}/search`}><UserOutlined />Search</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUserName}/timeline`}><ContainerOutlined />Timeline</Link>
                                <br></br>
                                <br></br>
                                <Link to={`/user/${loggedUserName}/followRequests`}><MenuOutlined />FollowRequests</Link>
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