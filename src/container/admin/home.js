import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button, Drawer } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import UserList from './userList';
import UserRequests from '../../../userRequests';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    InstagramOutlined,
    UserOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import SideDrawer from '../SideDrawer/sideDrawer';
const { SubMenu } = Menu;
class Home extends Component {
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
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <div>
                {console.log("entered admin home=========")}
                <SideDrawer role={"admin"}></SideDrawer>
                {/* <Router> */}
                    {/* <Button type="primary" onClick={this.showDrawer} style={{ marginRight: 1300 }}>Menu</Button>
                    <Drawer
                        title="Basic Drawer"
                        placement="left"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Link to="/admin/userList"><InstagramOutlined />UserLists</Link>
                        <br></br>
                        <br></br>
                        <Link to="/admin/userRequests"><UserOutlined />Requests</Link>
                    </Drawer>
                    <Switch>
                        {console.log("entered switch")}
                        <Route path="/admin/userList"  component={UserList} /> */}
                        {/* <Route path="/admin/userList" >
                            {console.log("entered switch1")}
                            <UserList />
                        </Route> */}
                        {/* <Route path="/admin/userRequests" component={UserRequests}></Route> */}
                        {/* <Route path="/admin/userRequests" >
                            {console.log("entered s2")}
                            <UserRequests />
                        </Route> */}
                    {/* </Switch> */}
                {/* </Router> */}
            </div>

        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        
    };
};
const mapStateToProps = (state) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);