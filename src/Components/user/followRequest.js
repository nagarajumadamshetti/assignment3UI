import React, { Component } from 'react'
import { Checkbox, } from 'antd';
import { Table } from 'reactstrap';

class FollowRequests extends Component {

    componentDidMount() {
        this.props.onGetFollowRequests(this.props.userName);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.followRequests !== this.props.followRequests) {
            // this.props.onGetFollowRequests(this.props.userName);
        }
    }

    onAcceptChange = (e) => {

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

    }
    render() {
        return (<div>
            <h1>Follow Requests</h1>

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
                                            <td><Checkbox onChange={this.onAcceptChange} id={el.followRequestUserId}></Checkbox></td>
                                            <td><Checkbox onChange={this.onDeclineChange} id={el.followRequestUserId}></Checkbox></td>
                                            <td>{el.followRequestUserName}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                )
                    : null
            }
        </div>);
    }
}
export default FollowRequests;