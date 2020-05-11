import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Button as AntButton, Carousel, Card, Skeleton, message, Pagination } from 'antd';



import { HeartTwoTone, DeleteOutlined } from '@ant-design/icons';

import UserInfo from '../../Containers/userContainers/userInfoContainer';
import Comments from '../../Containers/userContainers/commentsContainer';

const { Meta } = Card;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStageName: null,
            toggleAddNewStage: false,
            fileList: [],
            uploading: false,
            previewImage: '',
            previewVisible: false,
        }
    }

    componentDidMount = async () => {
        let userName = this.props.userName//this.props.match.params.id;
        console.log(userName)
        await this.props.getUserPosts(userName.id);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.comments !== this.props.comments) {
            this.props.getUserPosts(this.props.userName.id);
        }
    }

    handleLikePost = async (e) => {
        e.preventDefault();
        let obj = {
            postId: e.target.id,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.userName.id);
    }

    handleDeletePost = async (e) => {
        e.preventDefault();
        let obj = {
            postId: e.target.id,
        }
        await this.props.onDeletePost(obj);
        await this.props.getUserPosts(this.props.userName.id);
    }

    render() {
        return (
            <div>
                {this.props.userPosts ? (
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

                        <UserInfo from={"profile"} name={this.props.userName.userName}></UserInfo>
                        <br />
                        <Container
                            style={{
                                border: '2px solid black',
                                // display: 'flex',
                                overflowY: 'scroll',
                                width: '100%',
                                height: '450px',
                                maxHeight: '450px'
                            }}
                        >
                            {

                                this.props.userPosts.map((el, key) => {
                                    return (
                                        <div key={key} style={{ width: 240 }}>
                                            <Card hoverable title={this.props.userName.userName} bordered={true} style={{ width: 240 }}
                                                actions={[
                                                    <AntButton onClick={this.handleLikePost} id={el.postId} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key} />{el.likes.length}</AntButton>,
                                                    <AntButton
                                                        onClick={this.handleDeletePost} id={el.postId} color="danger" type="danger"><DeleteOutlined /></AntButton>

                                                ]} >

                                                <Carousel autoplay>
                                                    {
                                                        (el.images).map((el2, key2) => {
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
                                                {/* {console.log(el.description)} */}
                                                <Meta title={el.description} description={el.description} />

                                            </Card>
                                            <Comments postId={el.postId} />
                                            <br />
                                        </div>

                                    )
                                })
                            }
                        </Container>
                        {/* <Pagination defaultCurrent={1} total={50} /> */}
                    </Container>
                ) : <Skeleton active ></Skeleton>}

            </div>
        );
    }
}

export default Profile;