import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Carousel, Card, message, } from 'antd';
import { Container } from 'reactstrap';
import { Input, Skeleton } from 'antd';
import UserInfo from './userInfo';
import axios from '../../axios';
import Comments from './comments';


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
            // console.log(searchName)
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
        // console.log(searchName)
        await this.props.getUserPosts(this.props.searchValue)
        // console.log(this.props.userPosts)
        await this.props.getUserFollowersAndFollowing(this.props.searchValue);
        searchName = this.props.searchValue;
        // console.log(searchName)
        await this.props.getUserPosts(searchName)

        this.setState({
            display: true,
        });
    }
    handleLikePost = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            postId: e.target.id,
        }
        await this.props.onLikePost(obj);
        let searchName = this.props.searchValue;
        // console.log(searchName)
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
                    this.state.display && this.props.success ? (
                        this.props.userPosts && this.props.success ? (
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

                                <UserInfo from={"search"} name={this.props.searchValue}></UserInfo>
                                {
                                    (this.props.followers.find(el => el.followersUserName === this.props.userName) || this.props.searchValue === this.props.userName) ?
                                        this.props.userPosts.map((el, key) => {
                                            return (
                                                <div key={key} style={{ width: 240 }}>
                                                    {/* <Carousel autoplay> */}
                                                    <Card hoverable title={this.props.searchValue} bordered={true} style={{ width: 240 }}
                                                        actions={[
                                                            <Button onClick={this.handleLikePost} id={el.postId} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key} />{el.likes.length}</Button>,

                                                        ]} >
                                                        {/* {console.log(el)} */}
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

                                                        <Meta title={el.description} description="www.instagram.com" />
                                                        {/* <AntButton className="Twotone"><HeartTwoTone className="TwoTone"/></AntButton> */}
                                                    </Card>
                                                    <Comments postId={el.postId}/>
                                                    {/* </Carousel> */}
                                                </div>

                                            )
                                        })
                                        : null
                                }
                            </Container>
                        ) : (
                                <div>
                                    UserNot found
                                </div>
                            )
                    ) :
                        <div>
                            UserNot found
                            <Skeleton active ></Skeleton>
                        </div>

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
    success: state.userReducer.success
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: async (value) => {
            // console.log(value)
            let id = value

            await axios.get(`/getUserPosts/${id}`)
                .then((res) => {
                    // console.log(res)
                    if (res.data.success) {
                        // message.success("success is true")
                        // console.log(res.data.data[0].posts);
                        dispatch({
                            type: "GETUSERPOSTS",
                            payload: res.data.data[0].posts
                        })
                        dispatch({
                            type: "SETGETUSERSUCCESS",
                            payload: true
                        })
                    }
                    else {
                        dispatch({
                            type: "SETGETUSERSUCCESS",
                            payload: false
                        })
                        // message.error(" success is false at search get user posts")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // message.error("error at search page get user posts dispatcher")
                })

        },
        onNewSearch: (value) => {
            dispatch({
                type: "SEARCHUSERNAME",
                payload: value,
            })
            dispatch({
                type: "SETGETUSERSUCCESS",
                payload: false
            })
        },
        onLikePost: async (value) => {
            await axios.post('/likeOrUnlikePost', {
                loggedUserIdToken:localStorage.getItem("token"),
                postId:value.postId
            })
                .then((res) => {
                    if (res.data.success) {

                        dispatch({
                            type: "LIKEUSERPOST",
                            payload: res.data.likes,
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        },
        getUserFollowersAndFollowing: async (value) => {
            let id = value
            // message.info("entered get followers and following")
            await axios.get(`/getFollowersAndFollowing/${id}`)
                .then((res) => {
                    // console.log(res)
                    if (res.data.success) {
                        // message.success("success is true")
                        dispatch({
                            type: "GETUSERFOLLOWERSANDFOLLOWING",
                            payload: {
                                following: (res.data.following[0].following),
                                followers: (res.data.followers[0].followers)
                            }
                        })
                        dispatch({
                            type: "SETGETUSERSUCCESS",
                            payload: true
                        })
                        // message.success(" followers and following recieved at search")
                    }
                    else {
                        dispatch({
                            type: "SETGETUSERSUCCESS",
                            payload: false
                        })
                        // message.warn(" followers and following NOT recieved at search")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // message.error("error at search page get user follower and following dispatcher")
                })

        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));