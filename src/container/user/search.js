import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Carousel, Card, message, } from 'antd';
import { Container } from 'reactstrap';
import { Input, Skeleton } from 'antd';
import UserInfo from './userInfo';
import axios from '../../axios';

import { HeartTwoTone, } from '@ant-design/icons';
const { Meta } = Card;
// const { Search } = Input;
class SearchPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            display: false,
        }
    }
    componentDidMount = async () => {
        // this.props.setUserName(this.state.searchValue)
        // let searchName = this.props.searchValue;
        // console.log(searchName)
        // await this.props.getUserPosts(searchName);
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.searchValue !== this.props.searchValue) {
            let searchName = this.props.searchValue;
            console.log(searchName)
            await this.props.getUserPosts(searchName)
        }
    }
    newSearch = async (e) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
        await this.props.onNewSearch(e.target.value);
        this.setState({ display: false })
    }
    handleSearch = async () => {
        let searchName = this.props.searchValue;
        console.log(searchName)
        await this.props.getUserPosts(searchName)
        console.log(this.props.posts)
        await this.props.getUserFollowersAndFollowing(this.props.searchValue);
        searchName = this.props.searchValue;
        console.log(searchName)
        await this.props.getUserPosts(searchName)
        this.setState({
            display: true,
        });
    }
    handleLikePost = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            key: e.target.id,
            postUserName: this.props.searchValue,
            presentUser: this.props.userName,
        }
        await this.props.onLikePost(obj);
        let searchName = this.props.searchValue;
        console.log(searchName)
        await this.props.getUserPosts(searchName)
        // await this.props.getUserPosts(this.props.userName);
        // console.log(e.target.value)
    }
    render() {
        return (
            <div>
                <Input placeholder="Search user" onChange={this.newSearch} />
                <Button type="primary" onClick={this.handleSearch}>Search</Button>
                {
                    this.state.display ? (
                        this.props.userPosts ? (
                            <Container
                                style={{
                                    border: '2px solid black',
                                    overflowY: 'scroll',
                                    width: '70%',
                                    float: 'center',
                                    position: 'center',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    // maxHeight: '250px'
                                }}
                            >

                                <UserInfo from={"search"} name={this.state.searchValue}></UserInfo>
                                {
                                    // (this.props.followers.find(el => el.followersUserName === this.props.userName) || this.props.searchValue === this.props.userName) ?
                                        this.props.userPosts.map((el, key) => {
                                            return (
                                                <div key={key}>
                                                    {/* <Carousel autoplay> */}
                                                    <Card hoverable title={this.props.searchValue} bordered={true} style={{ width: 240 }}
                                                        actions={[
                                                            // <Button onClick={this.handleLikePost} id={key} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key} />{el.likeCounter.length}</Button>,

                                                        ]} >
                                                        {console.log(el)}
                                                        <Carousel autoplay>
                                                            {
                                                                (el.images).map((el2, key2) => {
                                                                    // if (el2 !== "lastModified" && el2 !== "post_id"&& el2 !== "image_id")
                                                                    return (
                                                                        <div key={key2}>
                                                                            <img
                                                                                alt="example"
                                                                                src={`${el2.imageUrl}`}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </Carousel>
                                                        {console.log(el.description)}
                                                        <Meta title={el.description} description="www.instagram.com" />
                                                        {/* <AntButton className="Twotone"><HeartTwoTone className="TwoTone"/></AntButton> */}
                                                    </Card>

                                                    {/* </Carousel> */}
                                                </div>

                                            )
                                        }) 
                                        // : null
                                }
                            </Container>
                        ) : (
                                <div>
                                    UserNot found
                                </div>
                            )
                    ) :
                        <Skeleton active ></Skeleton>
                }
            </div>);
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    searchValue: state.userReducer.searchValue,
    followRequests: state.userReducer.followRequests,
    followers: state.userReducer.followers,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: async (value) => {
            console.log(value)
            let id = value

            await axios.get(`/getUserPosts/${id}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        message.success("success is true")
                        console.log(res.data.data[0].posts);
                        dispatch({
                            type: "GETUSERPOSTS",
                            payload: res.data.data[0].posts
                        })
                    }
                    else{
                        message.error(" success is false")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error("error at search page get user posts dispatcher")
                })

        },
        onNewSearch: (value) =>
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            }),
        onLikePost: (value) =>
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            }),
        getUserFollowersAndFollowing: async (value) => {
            let id=value
            message.info("entered get followers and following")
           await  axios.get(`/getFollowersAndFollowing/${id}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        message.success("success is true")
                        dispatch({
                            type: "GETUSERFOLLOWERSANDFOLLOWING",
                            payload: {
                                following: (res.data.following[0].following),
                                followers: (res.data.followers[0].followers)
                            }
                        })
                        message.success(" followers and following recieved")
                    }
                    else {
                        message.warn(" followers and following NOT recieved")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error("error at search page get user follower and following dispatcher")
                })

        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));