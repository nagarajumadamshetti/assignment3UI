import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </div>
);
class Comments extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };
    componentDidMount() {
        console.log("comments cdm")
        this.props.onGetComments(this.props.postId)
        this.setState({ comments: this.props.comments })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.postId !== this.props.postId) {
            console.log("comments cdu")
            this.props.onGetComments(this.props.postId)
            this.setState({ comments: this.props.comments })
        }
    }
    handleSubmit = async () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        await this.props.onCommentPost({
            postId: this.props.postId,
            comment: this.state.value
        })
        await this.props.onGetComments(this.props.postId);


        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: this.props.comments
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;
        // const comments

        return (
            <div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={this.props.userName}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default Comments;