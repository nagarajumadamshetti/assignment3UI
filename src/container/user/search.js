import React, { Component } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import { connect } from "react-redux";
// const { Header, Content, Footer } = Layout;
import { connect } from "react-redux";
import { Upload, Button, message, Modal as AntModal, Carousel, Card, Col, Row } from 'antd';
import { Container } from 'reactstrap';
import { Input } from 'antd';
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
        await this.props.getUserPosts(this.state.searchValue);
    }
    newSearch = (e) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
    }
    handleSearch = async () => {
        await this.props.getUserPosts(this.state.searchValue);
        this.setState({
            display: true,
        });
    }
    render() {
        return (
            <div>
                <Input placeholder="Search user" onChange={this.newSearch} />
                <Button  type="primary" onClick={this.handleSearch}>Search</Button>
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
                                        <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                            actions={[
                                                <HeartTwoTone className="TwoTone" key="like" value={el.likeCount} />,

                                            ]} >
                                            {console.log(el)}
                                            <Carousel autoplay>
                                                {
                                                    Object.keys(el).map((el2, key2) => {
                                                        if (el2 !== "description" && el2 !== "likeCounter")
                                                            return (
                                                                <div>
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
                    null
                }
            </div>);
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: (value) =>
            dispatch({
                type: "GETUSERPOSTS",
                payload: value,
            }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(SearchPost));