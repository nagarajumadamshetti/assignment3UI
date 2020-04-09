import React, { Component } from 'react';
import { connect } from "react-redux";
class UserPageAtAdmin extends Component{
    componentDidMount() {
        // console.log("=================");
    }
    render(){
        // console.log("=================");
        return(
            <div>
                <h1>User Page {this.props.match.params.id}</h1>
                {/* {console.log("=================")} */}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle:state.adminReducer.toggle,
    userData:state.adminReducer.userData
})
const mapDispatchToProps = dispatch => {
    return {
        onGetData: (value) =>
            dispatch({
                type: "GETUSERDATA",
                payload:value
            }),
        
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserPageAtAdmin));
// export default UserPageAtAdmin;