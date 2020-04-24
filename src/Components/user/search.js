import React, { Component } from 'react';

import { Button, Carousel, Card, message, Input, Skeleton } from 'antd';

import { Container } from 'reactstrap';

import UserInfo from '../../Containers/userContainers/userInfoContainer';
import Comments from '../../Containers/userContainers/commentsContainer';


import { HeartTwoTone, } from '@ant-design/icons';
const { Meta } = Card;

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
            // let searchName = this.props.searchValue;
            // console.log(searchName)
            // await this.props.getUserPosts(searchName)
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
                                <br/>
                                <Container
                                    style={{
                                        border: '2px solid black',
                                        // display: 'flex',
                                        overflowY: 'scroll',
                                        width: '100%',
                                        height: '350px',
                                        maxHeight: '350px'
                                    }}
                                >
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
                                                        <Comments postId={el.postId} />
                                                        {/* </Carousel> */}
                                                    </div>

                                                )
                                            })
                                            : null
                                    }
                                </Container>
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
export default SearchPost