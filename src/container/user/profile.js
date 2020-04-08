import React, { Component } from 'react';
import SideDrawer from '../SideDrawer/sideDrawer'
import UserHome from './userHome';
import { Card, Col, Row } from 'antd';
import {Container} from 'reactstrap';
export default class Profile extends Component{
    componentDidMount() {
        
    }
    componentDidUpdate(prevProps, prevState) {
        
    }
    render(){
        return(
            <div>
                <h1>profile page</h1>
                {/* <UserHome></UserHome> */}
                {/* <SideDrawer role={"user"}/> */}
                <Container >

                </Container>
            </div>
        );
    }
}