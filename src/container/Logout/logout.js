import React, { Component } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button,Spin } from 'antd';
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
        await localStorage.removeItem("token");
        this.setState({ logout: true })
    }
    render() {
        return (
            <div  >
                <Button
                 style={{ float: 'right' }}type="primary" onClick={this.handleLogout}
                 ><LogoutOutlined />LOGOUT</Button>
                {this.state.logout ?
                    (
                    <div 
                    // style={{top:'0', bottom:'0', left:'0', right:'0',OObjectPosition:'absolute' }}
                    style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'}}
                    >
                        {console.log("heloo")}
                    {
                        <Spin tip="Loading...">
                        {/* <Skeleton active > */}
                            {window.location.href='/login'}
                            
                            {/* </Skeleton> */}
                            
                            </Spin>

                            }
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