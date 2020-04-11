import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { Spin, Statistic, Row, Col, Button, Select, Menu, Dropdown, message } from 'antd';
import { LoadingOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

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
        await this.setState({
            followers: (
                <Menu >
                    {
                        this.props.followers.map((el, key) => {
                            return (
                                <Menu.Item value={el} key={key} onClick={() => this.handleMenuClick(el)}>
                                    <UserOutlined />
                                    {el}
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
                                <Menu.Item value={el} key={key} onClick={() => this.handleMenuClick(el)} >
                                    <UserOutlined />
                                    {el}
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
        await this.props.onGetFollowRequests(this.props.searchValue);
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
        await this.props.onGetFollowRequests(this.props.searchValue);
        if(!this.props.followRequests.find(element => element === this.props.userName))
        await this.props.followAndUnFollow(myName);
        await this.props.getUserFollowersAndFollowing(this.props.name);
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
                {console.log(this.props.followRequests)}
                {console.log("hello")}
                <Container style={{ border: '2px solid' }}>
                    {this.props.searchValue}
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
                                                this.props.followers.find(element => element === this.props.userName)
                                                    ?
                                                    "Unfolow"
                                                    :
                                                    // "fo"            
                                                    (this.props.followRequests ? (this.props.followRequests.find(element => element === this.props.userName) ? "Requested" : "Follow") : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)

                                            }
                                        </Button>

                                    )
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                    ) :
                        null
                    }

                </Container>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    followers: state.userReducer.followers,
    following: state.userReducer.following,
    searchValue: state.userReducer.searchValue,
    followRequests: state.userReducer.followRequests,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserFollowersAndFollowing: (value) =>
            dispatch({
                type: "GETUSERFOLLOWERSANDFOLLOWING",
                payload: value
            }),
        followAndUnFollow: (value) =>
            dispatch({
                type: "FOLLOWANDUNFOLLOW",
                payload: value
            }),
        onNewSearch: (value) =>
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            }),
        onGetFollowRequests: (value) =>
            dispatch({
                type: "GETFOLLOWREQUESTS",
                payload: value,
            }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserInfo));
// export default UserInfo;