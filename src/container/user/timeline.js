import React, { Component } from 'react';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';
import { Button } from 'reactstrap';
import { Upload, Button as AntButton, message, Modal as AntModal, Card, Carousel, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { HeartTwoTone, } from '@ant-design/icons';
import axios from '../../axios';
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
class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStageName: '',
            toggleAddNewStage: false,
            fileList: [],
            uploading: false,
            previewImage: '',
            previewVisible: false,
        }
    }
    componentDidMount = async () => {
        await this.props.getTimeline(this.props.userName);
    }
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });
    handleUpload = async () => {
        const { fileList } = this.state;
        let formData = new FormData();

        await fileList.forEach(file => {
            file = { ...file, description: this.state.newStageName }
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,

        });

        await this.props.uploadDescription(this.state.newStageName);

        await this.props.uploadPost({
            fileList,
            description: this.props.description
        });



        await this.setState({
            fileList: [],
            uploading: false,
            newStageName: null,
        });


    }
    handleAddNewStageToggler = (e) => {
        e.preventDefault();
        this.setState({ toggleAddNewStage: !this.state.toggleAddNewStage })
    }
    newStageNameHandler = (e) => {
        e.preventDefault();
        this.setState({ newStageName: e.target.value });
    }

    handleNotSubmit = () => {
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
            newStageName: ''
        })
    }
    handleSubmitNewStage = () => {
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
        })
    }
    handleChange = ({ fileList }) => {
        this.setState({ fileList });

    };
    handleLikePost = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let obj = {
            postId: e.target.id,
        }
        await this.props.onLikePost(obj);
        let searchName = this.props.searchValue;
        // console.log(searchName)
        await this.props.getTimeline(this.props.userName);
        // await this.props.getUserPosts(this.props.userName);
        // console.log(e.target.value)
    }
    render() {
        const uploading = this.state.uploading;
        const fileList = this.state.fileList;
        const previewVisible = this.state.previewVisible;
        const previewImage = this.state.previewImage;
        const props = {
            listType: 'picture-card',
            className: "avatar-uploader",
            onRemove: file => {
                this.setState(state => {
                    const index = this.state.fileList.indexOf(file);
                    const newFileList = this.state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {

                this.setState(state => ({

                    fileList: [...this.state.fileList, file],
                }));
                return false;
            },
            fileList,

        };
        return (
            <div>
                {/* <h1>timeline page</h1> */}
                <Container style={{
                    border: '2px solid black',
                    display: 'flex',
                    overflowX: 'scroll',
                    width: '70%',
                    maxHeight: '150px'
                }}
                >
                    <Button outline color="info" onClick={this.handleAddNewStageToggler}> Add new Post</Button>
                    <Modal isOpen={this.state.toggleAddNewStage} toggle={() => this.state.toggleAddNewStage} backdrop="static" >

                        <ModalHeader toggle={() => this.state.toggleAddNewStage}>Add A NEW STAGE</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="newStage">Stage Name</Label>
                                    <Input type="text" id="newStage" onChange={this.newStageNameHandler} placeholder="enter description"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Upload {...props} onChange={this.handleChange}>
                                        <AntButton style={{ type: "picture" }}>
                                            <UploadOutlined /> Select File
                                        </AntButton>
                                    </Upload>
                                    <AntButton
                                        type="primary"
                                        onClick={this.handleUpload}
                                        disabled={fileList.length === 0}
                                        loading={uploading}
                                        style={{ marginTop: 16 }}
                                    >
                                        {uploading ? 'Uploading' : 'Start Upload'}
                                    </AntButton>
                                    <AntModal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </AntModal>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline color="primary" onClick={this.handleSubmitNewStage}>Done</Button>{' '}
                            <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
                <br />
                <Container
                    style={{
                        border: '2px solid black',
                        // display: 'flex',
                        // overflowY: 'scroll',
                        // width: '70%',
                        // maxHeight: '150px'
                    }}
                >
                    {this.props.timeline ?
                        this.props.timeline.map((el, key) => {
                            return (
                                <div key={key}>
                                    {/* <Carousel autoplay> */}
                                    <Card hoverable title={el.userName} bordered={true} style={{ width: 240 }}
                                        actions={[
                                            <Button onClick={this.handleLikePost} id={el.id} type='primary' color="primary"><HeartTwoTone className="TwoTone" key={key} />{el.Likes.length}</Button>,

                                        ]} >
                                        {/* {console.log(el)} */}
                                        <Carousel autoplay>
                                            {
                                                (el.Images).map((el2, key2) => {
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

                                    {/* </Carousel> */}
                                </div>

                            )
                        })
                        : null}
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
    description: state.userReducer.description,
    timeline:state.userReducer.timeline
})
const mapDispatchToProps = dispatch => {
    return {
        getTimeline: async (value) => {
            let id = localStorage.getItem("token");
            await axios.get(`/timeline/${id}`)
                .then((res) => {
                    if (res.data.success) {
                        console.log(res.data.timeline)
                        dispatch({
                            type: "GETTIMELINE",
                            payload: res.data.posts
                        })
                    }
                    else {
                        message.warn("timeline not recieved")
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        getUserPosts: (value) =>
            dispatch({
                type: "GETUSERPOSTS",
                payload: value
            }),
        uploadPost: async (value) => {

            axios.post('/uploadNewPost', {
                token: localStorage.getItem("token"),
                description: value.description,
                imageList: value.fileList
            })
                .then((res) => {
                    if (res.data.success) {
                        message.success("successfully uploaded the post");
                        dispatch({
                            type: "UPLOADNEWPOST",
                            payload: value.imageList
                        })
                    }
                    else {
                        message.warning("err uploading the post at BE");
                    }
                })
                .catch((err) => {

                    message.error("err at upload post dispatcher");
                })

        },
        uploadDescription: (value) =>
            dispatch({
                type: "NEWDESCRIPTION",
                payload: value
            }),
            
        onLikePost: async (value) => {
            await axios.post('/likeOrUnlikePost', {
                loggedUserIdToken: localStorage.getItem("token"),
                postId: value.postId
            })
                .then((res) => {
                    if (res.data.success) {

                        // dispatch({
                        //     type: "LIKEUSERPOST",
                        //     payload: res.data.likes,
                        // })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        },
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Timeline));
// export default Timeline;