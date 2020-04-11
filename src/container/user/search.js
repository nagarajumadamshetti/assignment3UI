import React, { Component } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import { connect } from "react-redux";
// const { Header, Content, Footer } = Layout;
import { connect } from "react-redux";
import { Upload, Button, message, Modal as AntModal, Carousel, Card, Col, Row } from 'antd';
import { Container } from 'reactstrap';
import { Input, Skeleton } from 'antd';
import UserInfo from './userInfo';

import { DownloadOutlined, HeartTwoTone, LikeOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Search } = Input;
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
        await this.props.getUserPosts(this.props.searchValue);
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.searchValue !== this.props.searchValue) {
            await this.props.getUserPosts(this.props.searchValue);
        }
    }
    newSearch = async (e) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
        await this.props.onNewSearch(e.target.value);
        this.setState({ display: false })
    }
    handleSearch = async () => {
        await this.props.getUserPosts(this.props.searchValue);
        this.setState({
            display: true,
        });
    }
    handleLikePost = async(e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            key: e.target.id,
            postUserName:this.props.searchValue,
            presentUser:this.props.userName,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.searchValue)
        // await this.props.getUserPosts(this.props.userName);
        // console.log(e.target.value)
    }
    render() {
        return (
            <div>
                <Input placeholder="Search user" onChange={this.newSearch} />
                <Button type="primary" onClick={this.handleSearch}>Search</Button>
                {this.state.display ? (
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
                                this.props.userPosts.map((el, key) => {
                                    return (
                                        <div key={key}>
                                            {/* <Carousel autoplay> */}
                                            <Card hoverable title={this.props.searchValue} bordered={true} style={{ width: 240 }}
                                                actions={[
                                                    <Button onClick={this.handleLikePost} id={key} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key}/>{el.likeCounter.length}</Button>,
                                          
                                                ]} >
                                                {console.log(el)}
                                                <Carousel autoplay>
                                                    {
                                                        Object.keys(el).map((el2, key2) => {
                                                            if (el2 !== "description" && el2 !== "likeCounter")
                                                                return (
                                                                    <div key={key2}>
                                                                        <img
                                                                            alt="example"
                                                                            src={`${el[el2].thumbUrl}`}
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
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: (value) =>
            dispatch({
                type: "GETUSERPOSTS",
                payload: value,
            }),
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
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));