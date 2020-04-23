import React, { Component } from 'react';
import { connect } from "react-redux";
import Profile from '../../Containers/userContainers/profileContainer';

class UserPageAtAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            display: false,
        })
    }
    componentDidMount = async () => {
        console.log("=================");
        console.log(this.props.match.params.id)
        await this.props.setUsersUserName(this.props.match.params.id)
        // console.log(this.props.userName)
        // return(<Profile/>)
        this.setState({ display: true })
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

export default UserPageAtAdmin;