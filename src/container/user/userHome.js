import React, { Component } from 'react';
import SideDrawer from '../SideDrawer/sideDrawer';
import { connect } from "react-redux";
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
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle:state.adminReducer.toggle
})
const mapDispatchToProps = dispatch => {
    return {
        onGetList: () =>
            dispatch({
                type: "GETUSERSLIST"
            }),
        onChangeToggle:()=>
        dispatch({
            type:"TOGGLEUSER"
        })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserHome));
// export default UserHome;