import React, { Component } from 'react';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';
import { Button } from 'reactstrap';
import { Upload, Button as AntButton, Carousel, message, Modal as AntModal, Card, Col, Row, Skeleton } from 'antd';
import { UploadOutlined, LikeOutlined, HeartTwoTone } from '@ant-design/icons';
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import UserInfo from './userInfo';
import { connect } from "react-redux";
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
        console.log(this.props.userName)

        await this.props.getUserPosts(this.props.userName);

    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.userPosts !== this.props.userPosts) {
        //     this.props.getUserPosts();
        // }
    }
    handleLikePost = async(e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            key: e.target.id,
            postUserName:this.props.userName,
            presentUser:this.props.userName,
        }
        await this.props.onLikePost(obj);
        await this.props.getUserPosts(this.props.userName);
        // console.log(e.target.value)
    }
    handleDeletePost = async (e) => {
        e.preventDefault();
        console.log(e.target.id)
        let obj = {
            key: e.target.id,
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
                                console.log("profile 75")
                                return (
                                    <div key={key}>
                                        <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }}
                                            actions={[
                                            <AntButton onClick={this.handleLikePost} id={key} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key}/>{el.likeCounter.length}</AntButton>,
                                                <AntButton
                                                    onClick={this.handleDeletePost} id={key} color="danger"><DeleteOutlined /></AntButton>

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
                ) : <Skeleton active ></Skeleton>}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    searchValue: state.userReducer.searchValue,
});
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: (value) =>
            dispatch({
                type: "GETUSERPOSTS",
                payload: value
            }),

        onDeletePost: (value) =>
            dispatch({
                type: "DELETEUSERPOST",
                payload: value,
            }),
            onLikePost: (value) =>
            dispatch({
                type: "LIKEUSERPOST",
                payload: value,
            }),
        setUserName: (value) =>
            dispatch({
                type: "SETUSERNAME",
                payload: value
            }),
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Profile));
// export default Profile;