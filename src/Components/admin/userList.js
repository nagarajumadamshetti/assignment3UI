import React, { Component } from 'react';
import { connect } from "react-redux";

import { Route, Link, } from 'react-router-dom';
import UserPageAtAdmin from '../../Containers/adminContainers/userPageAtAdminContainer';
import axios from '../../axios'
import { message } from 'antd'
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
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
    hideUserLinks = async (e) => {
        await this.props.setUserName(e.target.id)
        this.props.onChangeToggle();
        this.setState({ toggle: !this.state.toggle })

    }
    render() {
        return (
            <div>
                {
                    !this.props.toggle
                        ?
                        (
                            <div>
                                <h1>User List</h1>
                                {this.props.userList ? (
                                    this.props.userList.map((el, key) => {
                                        return (
                                            <div key={key}>
                                                {/* <Link to={`/admin/userList/${el}`} >{el}</Link> */}
                                                <br />
                                                {console.log(el)}
                                                <Link onClick={this.hideUserLinks} id={el.userName} to={{
                                                    pathname: `/admin/userList/${el.userName}`,
                                                }}>
                                                    {el.userName}
                                                </Link>
                                            </div>
                                        )
                                    })
                                )
                                    : null
                                }
                            </div>
                        ) : (
                            <div>
                                <Route path="/admin/userList/:id" exact component={UserPageAtAdmin} />
                            </div>
                        )}
            </div>
        );
    }
}
export default UserList;