import React, { Component } from 'react';
import { connect } from "react-redux";
import Profile from '../user/profile';

class UserPageAtAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            display: false,
        })
    }
    componentDidMount = async () => {
        // console.log("=================");
        // await this.props.setUserName(this.props.match.params.id)
        console.log(this.props.userName)
        // return(<Profile/>)
        await this.setState({ display: true })
    }
    componentWillUnmount = async () => {
        this.setState({ display: false })
        // await this.props.setUserName(null);
    }
    render() {
        // console.log("=================");
        return (
            <div>
                {this.state.display ? <Profile /> : null}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userName: state.loginReducer.userName,
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