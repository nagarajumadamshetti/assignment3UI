import React, { Component } from 'react'
import { Checkbox, message } from 'antd';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import axios from '../../axios';
class FollowRequests extends Component {
    componentDidMount() {
        this.props.onGetFollowRequests(this.props.userName);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.followRequests !== this.props.followRequests) {
            // this.props.onGetFollowRequests();
        }
    }

    onAcceptChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.accept(obj);
        this.props.onGetFollowRequests(this.props.userName);
    }
    onDeclineChange = (e) => {
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.decline(obj);
        this.props.onGetFollowRequests(this.props.userName);

        console.log(e.target.id)
    }
    render() {
        console.log("entered p2")
        return (<div>
            <h1>Follow Requests</h1>
            {console.log("entered p3")}

            {
                this.props.followRequests ? (<div>
                    <Table dark bordered striped >
                        <thead>
                            <tr>
                                <th>Accept</th>
                                <th>Decline</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.followRequests.map((el, key) => {
                                    return (
                                        <tr key={key}>
                                            {/* <th scope="row">1</th> */}
                                            <td><Checkbox onChange={this.onAcceptChange} id={el.followRequestUserId}></Checkbox></td>
                                            <td><Checkbox onChange={this.onDeclineChange} id={el.followRequestUserId}></Checkbox></td>
                                            <td>{el.followRequestUserName}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>) : null
            }

        </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetFollowRequests: async (value) => {
            let v = value
            await axios.get(`/getFollowRequests/${v}`)
                .then((res) => {
                    if (res.data.success) {
                        dispatch({
                            type: "GETFOLLOWREQUESTS",
                            payload: res.data.followRequests,
                        })
                    }
                })
                .catch((err) => {
                    // message.error("err at  get requests case 38")
                    console.log(err)
                })
        },
        accept: async (v) => {
            let value = v
            await axios.put('/approveFollowRequest', {
                accepted: value.value,
                followRequestUserId: value.index,
                loggedUserIdToken: localStorage.getItem('token'),
            })
                .then((res) => {
                    if (res.data.success) {
                        dispatch({
                            type: "ACCEPTFOLLOW",
                            payload: res.data.followRequests
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    // message.error("err at accept signup user dispatcher")
                })

        },
        decline: async (v) => {
            let value = v;
            await axios.delete('/declineFollowRequest', {
                data: {
                    accepted: value.value,
                    followRequestUserId: value.index,
                    loggedUserIdToken: localStorage.getItem('token'),
                }
            }).then((res) => {
                dispatch({
                    type: "DECLINEFOLLOW",
                    payload: value
                })
            })
                .catch((err) => {
                    // message.error("err at decline signup user dispatcher")
                })

        },
    }
}
const mapStateToProps = state => ({
    followRequests: state.userReducer.followRequests,
    userName: state.userReducer.userName,
})
export default connect(mapStateToProps, mapDispatchToProps)(FollowRequests);