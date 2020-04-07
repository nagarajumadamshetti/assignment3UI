import React, { Component } from 'react';
import { connect } from "react-redux";
import { Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class UserList extends Component {
    componentDidMount() {
        this.props.onGetList();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        console.log("p1")
        return (
            <div>
                <h1>User List</h1>
                {console.log("entered userList")}
                {this.props.userList ? (
                    this.props.userList.map((el, key) => {
                        return (
                            <div>
                                <Link to= {`/admin/userList/${el}`} key={el}>{el}</Link>
                                {/* <Link to={{
                                        pathname: `/admin/userList/${el}`,
                                        state: {
                                            data: el
                                        },
                                    }}>{el}</Link> */}
                                <br></br>
                            </div>
                        )
                    })
                ) : null}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userList: state.adminReducer.userList,
})
const mapDispatchToProps = dispatch => {
    return {
        onGetList: () =>
            dispatch({
                type: "GETUSERSLIST"
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserList));