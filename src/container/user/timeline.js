import React, { Component } from 'react';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, } from 'reactstrap';
import { Button } from 'reactstrap';
import { Upload, Button as AntButton, message, Modal as AntModal, Card, Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

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
            newStageName: null,
            toggleAddNewStage: false,
            fileList: [],
            uploading: false,
            previewImage: '',
            previewVisible: false,
        }
    }
    componentDidMount() {
        this.props.getUserPosts();
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
        console.log(fileList)
        console.log(this.state)
        let formData = new FormData();

        await fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });
        console.log(formData);
        console.log(fileList)
        console.log(this.props.userName)
        await this.props.uploadPost(fileList);
        await this.props.getUserPosts();
        //axios call here
        // You can use any AJAX library you like
        // reqwest({
        //     url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //     method: 'post',
        //     processData: false,
        //     data: formData,
        //     success: () => {
        //       this.setState({
        //         fileList: [],
        //         uploading: false,
        //       });
        //       message.success('upload successfully.');
        //     },
        //     error: () => {
        //       this.setState({
        //         uploading: false,
        //       });
        //       message.error('upload failed.');
        //     },
        //   });
        await this.setState({
            fileList: [],
            uploading: false,
        });
        message.success('upload successfully.');

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
            newStageName: null
        })
    }
    handleSubmitNewStage = () => {
        if (this.state.newStageName === null || this.state.newStageName === "") {
            alert("enter Valid stage name");
            return;
        }
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
        })
    }
    handleChange = ({ fileList }) => this.setState({ fileList });
    render() {
        {/* <h1>{this.props.match.params.id}</h1> */ }
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
                    {/* <Button outline color="info" onClick={this.handleAddNewStageToggler}> Add new Stage</Button>
                <Modal isOpen={this.state.toggleAddNewStage} toggle={this.state.toggleAddNewStage} backdrop="static" >

                    <ModalHeader toggle={this.state.toggleAddNewStage}>Add A NEW STAGE</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="newStage">Stage Name</Label>
                                <Input type="text" id="newStage" onChange={this.newStageNameHandler} placeholder="enter new stage name"></Input>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" onClick={this.handleSubmitNewStage}>Add Stage</Button>{' '}
                        <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                    </ModalFooter>
                </Modal> */}
                </Container>
                {this.props.userPosts ? (
                    <Container
                        style={{
                            border: '2px solid black',
                            overflowY: 'scroll',
                            width: '70%',
                            float: 'center',
                            position: 'center',
                            textAlign: 'center'
                            // maxHeight: '250px'
                        }}
                    >
                        {
                            this.props.userPosts.map((el, key) => {
                                return (

                                    // <div className="site-card-wrapper">

                                    <Row >

                                        {/* //gutter={16} */}
                                        {/* <Col  > */}
                                        {/* //span={8} */}

                                        <Card hoverable title={this.props.userName} bordered={true} style={{ width: 240 }} >

                                            <img
                                                alt="example"
                                                src={`${el.thumbUrl}`}
                                            />


                                            <Meta title={`${el.name}`} description="www.instagram.com" />
                                        </Card>

                                        <br></br>
                                        <br></br>
                                        {/* </Col> */}
                                    </Row>

                                    // {/* </div> */}

                                )
                            })
                        }
                    </Container>
                ) : null}

            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName: state.userReducer.userName,
    userPosts: state.userReducer.userPosts,
})
const mapDispatchToProps = dispatch => {
    return {
        getUserPosts: () =>
            dispatch({
                type: "GETUSERPOSTS",

            }),
        uploadPost: (value) =>
            dispatch({
                type: "UPLOADNEWPOST",
                payload: value
            })
    }
}
export default (connect(mapStateToProps, mapDispatchToProps)(Timeline));
// export default Timeline;