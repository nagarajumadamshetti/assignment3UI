import React, { Component } from 'react'
import { Checkbox, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import axios from '../../axios'

class UserRequests extends Component {
    componentDidMount = async () => {
        await this.props.onGetRequests();
        console.log(this.props.requests)

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.requests !== this.props.requests) {
            // this.props.onGetRequests();
            // console.log("user requests cdu")
        }
    }
    
    onAcceptChange = async (e) => {
        console.log(e.target.id);
        console.log(`checked = ${e.target.checked}`);
        let obj = {
            userName: e.target.id,
            value: e.target.checked
        }

        await this.props.accept(obj);
        await this.props.onGetRequests();
    }
    onDeclineChange = async (e) => {
        let obj = {
            userName: e.target.id,
            value: e.target.checked
        }

        await this.props.decline(obj);
        await this.props.onGetRequests();

        console.log(e.target.id)
    }
    render() {
        return (
            <div>
                {
                    this.props.requests ? (<div>
                        {/* {this.getRequestAxios} */}
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
                                    this.props.requests.map((el, key) => {
                                        return (
                                            <tr key={key}>
                                                {/* <th scope="row">1</th> */}
                                                <td><Checkbox onChange={this.onAcceptChange} id={el.userName}></Checkbox></td>
                                                <td><Checkbox onChange={this.onDeclineChange} id={el.userName}></Checkbox></td>
                                                <td>{el.userName}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>) : <Skeleton active></Skeleton>
                }

            </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        
        onGetRequests: async () => {
            await axios.get('/admin/userRequests')
                .then((res) => {
                    console.log(res.data.users)
                    dispatch({
                        type: "GETSIGNUPREQUESTS",
                        payload: res.data.users
                    })
                })
                .catch((err) => {
                    message.error("err at  get requests case 38")
                    console.log(err)
                })
        },
        accept: async (value) => {
            await axios.put('/admin/userRequests/accept', {
                userName: value.userName,
                accepted: value.value
            }).then((res) => {
                dispatch({
                    type: "ACCEPT",
                    payload: value
                })
            })
                .catch((err) => {
                    message.error("err at accept signup user dispatcher")
                })

        },
        decline: async (value) => {
            await axios.delete('/admin/userRequests/decline', {
                data: {
                    userName: value.userName,
                }
            }).then((res) => {
                dispatch({
                    type: "DECLINE",
                    payload: value
                })
            })
                .catch((err) => {
                    message.error("err at decline signup user dispatcher")
                })
        }
    }
}
const mapStateToProps = state => ({
    requests: state.adminReducer.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);