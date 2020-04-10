import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import UserPageAtAdmin from './userPageAtAdmin'
const t = false;
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
    hideUserLinks = () => {
        console.log("entered hide user links")
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
                                         <Link onClick={this.hideUserLinks}  to={{
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
export default (connect(mapStateToProps, mapDispatchToProps)(UserList));