import React, { Component } from 'react';
import SideDrawer from '../SideDrawer/sideDrawer';
class UserHome extends Component {
    render() {
        return (
            <div>
                {/* <h1>user home</h1> */}
                {console.log("entered user home")}
                <SideDrawer role={"user"}></SideDrawer>
            </div>
        );
    }
}
export default UserHome;