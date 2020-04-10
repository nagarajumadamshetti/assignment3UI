import React, { Component } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button,Skeleton,Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from '../login/login'
export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        }
    }
    componentDidMount() {
        this.setState({ logout: false })
        console.log("logout cdm")
    }
    componentWillUnmount() {
        console.log("cwum logout")
        this.setState({ logout: false })
    }
    handleLogout = async (e) => {
        e.preventDefault();
        await localStorage.removeItem("role");
        this.setState({ logout: true })
    }
    render() {
        return (
            <div  >
                <Button style={{ float: 'right' }} onClick={this.handleLogout}><LogoutOutlined /></Button>
                {this.state.logout ?
                    (<div>
                        {console.log("heloo")}
                    {<Spin tip="Loading..."><Skeleton active >{window.location.href='/login'}</Skeleton></Spin>}
                        {/* {window.location.href='/login'} */}
                        {/* <Redirect to='/login' push={true}/> */}
                        {/* <Route  exact component={Login} /> */}
                    </div>)
                    :
                    null
                }
            </div>
        );
    }
}