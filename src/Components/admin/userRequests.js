import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Skeleton, } from 'antd';
import { Table } from 'reactstrap';
import { getSignUpRequests } from '../../Actions/adminActions';
import { onGetRequests, accept, decline, } from '../../Containers/adminContainers/userRequestsContainer';
import { ToolFilled } from '@ant-design/icons';


const UserRequests = () => {
    const dispatch = useDispatch();
    let [requests, ChangeRequests] = useState([]);
    let [toggle, ChangeToggle] = useState(false)
    useEffect(() => {
        onGetRequests()
            .then((users) => {
                ChangeRequests(users);
                requests = users;
                ChangeToggle(true);
            });
    }, [toggle]);

    const onAcceptChange = async (e) => {
        let obj = {
            id: e.target.id,
            value: e.target.checked
        }

        await accept(obj);
        ChangeToggle(false)
    }

    const onDeclineChange = async (e) => {
        let obj = {
            id: e.target.id,
            value: e.target.checked
        }
        await decline(obj);
        toggle = false
        ChangeToggle(false);
    }

    return (
        <div>
            {
                (requests && toggle) ? (<div>
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
                                            <td><Checkbox onChange={onAcceptChange} id={el.id}></Checkbox></td>
                                            <td><Checkbox onChange={onDeclineChange} id={el.id}></Checkbox></td>
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