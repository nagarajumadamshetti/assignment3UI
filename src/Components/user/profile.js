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
        await this.props.getUserPosts(this.props.userName);

    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.comments !== this.props.comments) {
            this.props.getUserPosts(this.props.userName);
        }
    }
    
    handleLikePost = async (e) => {
        e.preventDefault();
        let obj = {
            postId: e.target.id,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.userName);
    }

    handleDeletePost = async (e) => {
        e.preventDefault();
        let obj = {
            postId: e.target.id,
        }
        await this.props.onDeletePost(obj);
        await this.props.getUserPosts(this.props.userName);
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
                        
                        <UserInfo from={"profile"} name={this.props.userName}></UserInfo>
                        {
                            this.props.userPosts.map((el, key) => {
                                return (
                                    <div key={key} style={{ width: 240 }}>
                                        <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
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
                                            {console.log(el.description)}
                                            <Meta title={el.description} description="www.instagram.com" />

                                        </Card>
                                        <Comments postId={el.postId} />
                                        <br />
                                    </div>

                                )
                            })
                        }
                        <Pagination defaultCurrent={1} total={50} />
                    </Container>
                ) : <Skeleton active ></Skeleton>}

            </div>
        );
    }
}

export default Profile;