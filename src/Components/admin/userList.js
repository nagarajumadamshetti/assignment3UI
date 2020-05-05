import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, } from 'react-router-dom';
import { onGetList } from '../../Containers/adminContainers/userListContainer';
import { getUserList } from '../../Actions/adminActions';

const UserList = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.adminReducer.userList);
    const toggle = useSelector((state) => state.adminReducer.toggle);
    const userName = useSelector((state) => state.adminReducer.userName);

    useEffect(() => {
        onGetList()
            .then(async (list) => {
                await dispatch(getUserList(list));
            })

    }, [dispatch]);

    return (
        <div>
            {
                !toggle
                    ?
                    (
                        <div>
                            <h1>User List</h1>
                            {
                                userList ? (
                                    userList.map((el, key) => {
                                        return (
                                            <div key={key}>
                                                <Link
                                                    id={el.userName}
                                                    to={`/admin/userList/${el.userName}`}
                                                >
                                                    {el.userName}
                                                </Link>
                                                <br />
                                            </div>
                                        )
                                    })
                                )
                                    : null
                            }
                        </div>
                    )
                    :
                    null
            }
        </div>
    );
}

export default UserList;