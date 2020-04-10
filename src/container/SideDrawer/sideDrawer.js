import React, { Component } from 'react';
import { Comment } from 'antd';
import { Menu, Button, Drawer } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import UserList from '../admin/userList';
import UserRequests from '../admin/userRequests';
import { connect } from "react-redux";
import UserPageAtAdmin from '../admin/userPageAtAdmin';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    InstagramOutlined,
    UserOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import UserHome from '../user/userHome';
import Profile from '../user/profile';
import Search from '../user/search';
import Timeline from '../user/timeline';
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
    componentDidMount=async()=> {
        // await this.props.setUserName(null);
    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {
        console.log("sidedrawer cwum");
    }
    hideUserLinks = () => {
        console.log("entered hide user links")
        if (this.state.visible === this.props.toggle)
            this.props.onChangeToggle();
        // this.setState({ toggle: !this.state.toggle })

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
                                </div>
                            )}
                </Drawer>
                {/* <Logout/> */}
                <Route exact component={Logout}/>
                <Switch>
                    {/* {console.log("entered switch")} */}
  
                    <Route path="/admin/userList" component={UserList} />
                    <Route path="/admin/userRequests" component={UserRequests}></Route>
                    <Route path="/user/:id/profile" component={Profile}></Route>
                    <Route path="/user/:id/search" component={Search}></Route>
                    <Route path="/user/:id/timeline" component={Timeline}></Route>

                    {/* <Route path="/admin/userList/:id" exact component={UserPageAtAdmin}/> */}
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle: state.adminReducer.toggle,
    loggedUserName:state.loginReducer.userName
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
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SideDrawer));

// export default SideDrawer;