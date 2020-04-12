import React, { Component } from 'react';
import { connect } from "react-redux";
import {  Route, Link, } from 'react-router-dom';
import UserPageAtAdmin from './userPageAtAdmin'
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        console.log(this.state.toggle)
        console.log("entered userlist")
    }
    componentDidMount() {

        this.props.onGetList();

    }
    componentWillUnmount() {
        console.log("unmounted")
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.toggle === true) {
            // this.props.onGetList();
        // await this.hideUserLinks()  
        //   this.setState({ toggle: false })
        }
    }
    hideUserLinks =async (e) => {
        console.log("entered hide user links")
        console.log(e.target.id)
        await this.props.setUserName(e.target.id)
        console.log(this.props.userName)
        this.props.onChangeToggle();
        this.setState({ toggle: !this.state.toggle })
        
    }
    render() {
        return (
            <div>
                {/* <Router> */}
                {!this.props.toggle ? (
                    <div>
                        <h1>User List</h1>
                        {this.props.userList ? (
                            this.props.userList.map((el, key) => {
                                return (
                                    <div key={key}>
                                        {/* <Link to={`/admin/userList/${el}`} >{el}</Link> */}
                                        <br/>
                                         <Link onClick={this.hideUserLinks} id={el} to={{
                                            pathname: `/admin/userList/${el}`,
                                            // state: {
                                            //     data: key
                                            // },
                                        }}>
                                            {el}
                                        </Link> 
                                        {/* <br></br> */}
                                    </div>
                                )
                            })
                        ) : null}
                    </div>
                ) : (
                        <div>
                            <Route path="/admin/userList/:id" exact component={UserPageAtAdmin} />
                        </div>
                    )}


                {/* </Router> */}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
    toggle:state.adminReducer.toggle,
    userName:state.userReducer.userName,
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
        }),
        setUserName: (value) =>
        dispatch({
            type: "SETUSERNAME",
            payload: value
        }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserList));