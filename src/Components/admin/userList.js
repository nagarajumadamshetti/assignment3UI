import React, { Component } from 'react';

import { Route, Link, Switch } from 'react-router-dom';
import UserPageAtAdmin from '../../Containers/adminContainers/userPageAtAdminContainer';
// import UserPageAtAdmin from './userPageAtAdmin'

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
        e.preventDefault();
        console.log(e.target.id)
        let name = e.target.id;
        await this.props.setUsersUserName(name)
        await this.props.setUserName(name)
        await this.props.onChangeToggle();
        console.log("toggle changed")
        console.log(this.props.toggle)
        // this.setState({ toggle: !this.state.toggle })

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
                                                <Link
                                                //  onClick={this.hideUserLinks} 
                                                 id={el.userName} 
                                                 to={`/admin/userList/${el.userName}`} >{el.userName}</Link>
                                                <br />
                                                {/* {console.log(el.userName)} */}
                                                {/* <Link onClick={this.hideUserLinks} id={el.userName} to={{
                                                    pathname: `/admin/userList/${el.userName}`,
                                                }}>
                                                    {el.userName}
                                                </Link> */}
                                                {/* <Route path="/admin/userList/:id" exact component={UserPageAtAdmin} /> */}
                                            </div>
                                        )
                                    })
                                )
                                    : null
                                }
                            </div>
                        )
                        :
                        (
                            <div>
                                {/* <Switch> */}
                                <h3>hello</h3>
                                {/* {console.log("entered upad routes")} */}
                                {/* <Route path="/admin/userList/:id" exact component={UserPageAtAdmin} /> */}
                                {/* {console.log("routed")} */}
                                {/* </Switch> */}
                            </div>
                        )
                }
            </div>
        );
    }
}
export default UserList;