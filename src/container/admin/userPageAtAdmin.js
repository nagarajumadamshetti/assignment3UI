import React, { Component } from 'react';
import { connect } from "react-redux";
import Profile from '../user/profile';
class UserPageAtAdmin extends Component{
    componentDidMount=async()=> {
        // console.log("=================");
        await this.props.setUserName(this.props.match.params.id)
    }
    
    render(){
        // console.log("=================");
        return(
            <div>
                <h1>User Page {this.props.match.params.id}</h1>
                <Profile />
                {/* {console.log("=================")} */}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
            setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),

    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPageAtAdmin));
// export default UserPageAtAdmin;