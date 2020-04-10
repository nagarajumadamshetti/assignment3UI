import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from 'reactstrap';
import { Statistic, Row, Col, Button, Select, Menu, Dropdown, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


const { Option } = Select;

class UserInfo extends Component {

    // const menu = (
    //     <Menu onClick={handleMenuClick}>
    //         <Menu.Item key="1">
    //             <UserOutlined />
    //     1st menu item
    //   </Menu.Item>
    //         <Menu.Item key="2">
    //             <UserOutlined />
    //     2nd menu item
    //   </Menu.Item>
    //         <Menu.Item key="3">
    //             <UserOutlined />
    //     3rd item
    //   </Menu.Item>
    //     </Menu>
    // );
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

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    componentDidMount = async () => {
        console.log("user info cdm");
        await this.props.getUserFollowersAndFollowing(this.props.name);
        await this.setState({
            followers: (
                <Menu onClick={this.handleMenuClick}>
                    {
                        this.props.followers.map((el, key) => {
                            return (
                                <Menu.Item value={el} key={key}>
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
                <Menu onClick={this.handleMenuClick}>
                    {
                        this.props.following.map((el, key) => {
                            return (
                                <Menu.Item value={el} key={key}>
                                    <UserOutlined />
                                    {el}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>)
        })
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.name !== this.props.name) {
            console.log("entered userinfo cdu")
            await this.props.getUserFollowersAndFollowing(this.props.name);
            await this.setState({
                followers: (
                    <Menu onClick={this.handleMenuClick}>
                        {
                            this.props.followers.map((el, key) => {
                                return (
                                    <Menu.Item value={el} key={key}>
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
                    <Menu onClick={this.handleMenuClick}>
                        {
                            this.props.following.map((el, key) => {
                                return (
                                    <Menu.Item value={el} key={key}>
                                        <UserOutlined />
                                        {el}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>)
            })
        }
    }
    handleFollow = async (myName) => {
        // e.preventDefault();
        console.log(myName)
        await this.props.followAndUnFollow(myName);
        await this.props.getUserFollowersAndFollowing(this.props.name);
        await this.setState({
            followers: (
                <Menu onClick={this.handleMenuClick}>
                    {
                        this.props.followers.map((el, key) => {
                            return (
                                <Menu.Item value={el} key={key}>
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
                <Menu onClick={this.handleMenuClick}>
                    {
                        this.props.following.map((el, key) => {
                            return (
                                <Menu.Item value={el} key={key}>
                                    <UserOutlined />
                                    {el}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>)
        })
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

                                {console.log(this.props.followers)}
                            </Col>
                            <Col span={12}>
                                <Statistic title="Following" value={this.props.following.length}  ></Statistic>
                                <Dropdown overlay={this.state.following}>
                                    <Button>
                                        Followers <DownOutlined />
                                    </Button>
                                </Dropdown>

                                {
                                    (this.props.from === "search" && (this.props.userName !== this.props.name)) ? (
                                        <Button style={{ marginTop: 16 }} type="primary" onClick={() => this.handleFollow(this.props.name)}>
                                            {
                                                this.props.followers.find(element => element === this.props.userName)
                                                    ?
                                                    "Unfolow"
                                                    :
                                                    "Follow"
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
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(UserInfo));
// export default UserInfo;