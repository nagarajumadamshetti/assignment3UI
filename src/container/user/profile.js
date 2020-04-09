import React, { Component } from 'react';
import SideDrawer from '../SideDrawer/sideDrawer'
import UserHome from './userHome';
import { Card, Col, Row } from 'antd';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
class Profile extends Component {
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <div>
                <h1>profile page</h1>
                <Container >
                    {/* <h1>{this.props.match.params.id}</h1> */}
                    <h1>{this.props.userName}</h1>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName:state.userReducer.userName
})
const mapDispatchToProps = dispatch => {
    return {
        onGetList: () =>
            dispatch({
                type: "GETUSERSLIST"
            }),
        onChangeToggle: () =>
            dispatch({
                type: "TOGGLEUSER"
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
// export default Profile;