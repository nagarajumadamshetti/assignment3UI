import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Skeleton, } from 'antd';
import { Table } from 'reactstrap';
import { getSignUpRequests } from '../../Actions/adminActions';
import { onGetRequests, accept, decline, } from '../../Containers/adminContainers/userRequestsContainer';


const UserRequests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.adminReducer.requests);

    useEffect(() => {
        onGetRequests()
            .then((users) => {
                dispatch(getSignUpRequests(users));
            });
    },[])

    const onAcceptChange = async (e) => {
        let obj = {
            userName: e.target.id,
            value: e.target.checked
        }
        await accept(obj);
        onGetRequests()
        .then((users) => {
            dispatch(getSignUpRequests(users));
        });
    }

    const onDeclineChange = async (e) => {
        let obj = {
            userName: e.target.id,
            value: e.target.checked
        }
        await decline(obj);
        onGetRequests()
        .then((users) => {
            dispatch(getSignUpRequests(users));
        });
    }

    return (
        <div>
            {
                requests ? (<div>
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
                                requests.map((el, key) => {
                                    return (
                                        <tr key={key}>
                                            <td><Checkbox onChange={ onAcceptChange} id={el.userName}></Checkbox></td>
                                            <td><Checkbox onChange={ onDeclineChange} id={el.userName}></Checkbox></td>
                                            <td>{el.userName}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                )
                    :
                    <Skeleton active></Skeleton>
            }
        </div>);
}

export default UserRequests;