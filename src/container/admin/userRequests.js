import React, { Component } from 'react'
import { Checkbox } from 'antd';
import { connect } from "react-redux";
// const { Column, ColumnGroup } = Table;
import { Table } from 'reactstrap';
class UserRequests extends Component {
    componentDidMount() {
        this.props.onGetRequests();
    }
    componentDidUpdate(prevProps, prevState) {
        // this.props.onGetRequests();
    }

    onAcceptChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.accept(obj);
        this.props.onGetRequests();
    }
    onDeclineChange = (e) => {
        let obj = {
            index: e.target.id,
            value: e.target.checked
        }

        this.props.decline(obj);
        this.props.onGetRequests();

        console.log(e.target.id)
    }
    render() {
        console.log("entered p2")
        return (<div>
            <h1>User Requests</h1>
            {console.log("entered p3")}
            <Table bordered >
                <thead>
                    <tr>
                        <th>Accept</th>
                        <th>Decline</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.requests ? (
                            this.props.requests.map((el, key) => {
                                return (
                                    <tr>
                                        {/* <th scope="row">1</th> */}
                                        <td><Checkbox onChange={this.onAcceptChange} id={key}></Checkbox></td>
                                        <td><Checkbox onChange={this.onDeclineChange} id={key}></Checkbox></td>
                                        <td>{el}</td>
                                    </tr>
                                )
                            })
                        ) : null
                    }
                </tbody>
            </Table>
        </div>);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetRequests: () =>
            dispatch({
                type: "GETREQUESTS"
            }),
        accept: (value) =>
            dispatch({
                type: "ACCEPT",
                payload: value
            }),
        decline: (value) =>
            dispatch({
                type: "DECLINE",
                payload: value
            })
    }
}
const mapStateToProps = state => ({
    requests: state.adminReducer.requests,
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);