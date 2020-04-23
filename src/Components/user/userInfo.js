import React, { Component } from 'react';

import { Container } from 'reactstrap';

import { Spin, Statistic, Row, Col, Button, Select, Menu, Dropdown, message, Skeleton } from 'antd';
import { LoadingOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: '',
            following: '',
        }
    }
    handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick = async (e) => {
        message.info(e);
        if (this.props.from !== "profile") {
            await this.props.onNewSearch(e)

            await this.props.getUserFollowersAndFollowing(e);
            await this.handleUpdatingMenu();
            console.log('click', e);
        }
    }
    handleUpdatingMenu = async () => {
        console.log(this.props.followers)
        await this.setState({
            followers: (
                <Menu >
                    {
                        this.props.followers.map((el, key) => {
                            return (
                                <Menu.Item value={el.followersUserName} key={key} onClick={() => this.handleMenuClick(el.followersUserName)}>
                                    <UserOutlined />
                                    {el.followersUserName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>)
        })
        await this.setState({
            following: (
                <Menu >
                    {
                        this.props.following.map((el, key) => {
                            return (
                                <Menu.Item value={el.followingUserName} key={key} onClick={() => this.handleMenuClick(el.followingUserName)} >
                                    <UserOutlined />
                                    {el.followingUserName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>)
        })
    }
    componentDidMount = async () => {
        console.log("user info cdm");
        await this.props.getUserFollowersAndFollowing(this.props.name);
        await this.handleUpdatingMenu();
        await this.props.onGetFollowRequests(this.props.name);
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if ((prevProps.name !== this.props.name)) {
            console.log("entered userinfo cdu")
            await this.props.getUserFollowersAndFollowing(this.props.name);
            await this.handleUpdatingMenu();
            await this.props.onGetFollowRequests(this.props.searchValue);
        }
        // if (prevProps.followRequests !== this.props.followRequests) {
        //     await this.props.onGetFollowRequests();
        // }
    }
    handleFollow = async (myName) => {
        // e.preventDefault();
        console.log(myName)
        // await this.props.onGetFollowRequests(this.props.searchValue);
        // if (!this.props.followRequests.find(element => element.followRequestUserName === this.props.userName))
        if (!this.props.followers.find(element => element.followersUserName === this.props.userName)||(this.props.followRequests.find(element => element.followRequestUserName === this.props.userName))) {
            await this.props.followAndUnFollow({ userName: myName, followed: false });
            console.log("follow")
        }
        else {
            await this.props.followAndUnFollow({ userName: myName, followed: true });
        }
        // await this.handleUpdatingMenu();
        await this.props.getUserFollowersAndFollowing(this.props.searchValue);
        console.log(this.props.followers);
        await this.handleUpdatingMenu();
        await this.props.onGetFollowRequests(this.props.searchValue);

    }
    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }
    render() {
        return (
            <div>
                <Container style={{ border: '2px solid' }}>
                    {this.props.name}
                    {this.props.followers && this.props.following ? (
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Followers" value={this.props.followers.length} ></Statistic>
                                <Dropdown overlay={this.state.followers}>
                                    <Button>
                                        Followers <DownOutlined />
                                    </Button>
                                </Dropdown>


                            </Col>
                            <Col span={12}>
                                <Statistic title="Following" value={this.props.following.length}  ></Statistic>
                                <Dropdown overlay={this.state.following}>
                                    <Button>
                                        Following <DownOutlined />
                                    </Button>
                                </Dropdown>

                                {
                                    (this.props.from === "search" && (this.props.userName !== this.props.searchValue)) ? (
                                        <Button style={{ marginTop: 16 }} type="primary" onClick={() => this.handleFollow(this.props.searchValue)}>
                                            {
                                                this.props.followers.find(element => element.followersUserName === this.props.userName)
                                                    // false
                                                    ?
                                                    "Unfolow"
                                                    :
                                                    // "Follow"
                                                    (this.props.followRequests ? (this.props.followRequests.find(element => element.followRequestUserName === this.props.userName) ? "Requested" : "Follow") : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)
                                            }
                                        </Button>
                                    )
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                    )
                        :
                        null
                    }

                </Container>
            </div>
        );
    }
}

export default UserInfo;