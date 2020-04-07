import React, { Component } from 'react'
class UserList extends Component{
    render(){
        console.log("p1")
        return(<div>
            <h1>User List</h1>
            {console.log("entered userList")}
        </div>);
    }
}
export default UserList;