import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, } from 'react-router-dom';
import { onGetList } from '../../Containers/adminContainers/userListContainer';
import { getUserList, changeToggle } from '../../Actions/adminActions';

const UserList = () => {
    const dispatch = useDispatch();
    const [userList,ChangeUserList]=useState([])
    const toggle = useSelector((state) => state.adminReducer.toggle);
    const [toggleNow,ChangeToggleNow]=useState(false);
    useEffect(() => {
        const myFun=async()=>{
           await onGetList()
            .then(async(list) => {
                await ChangeUserList(list)
               await ChangeToggleNow(true)
            })
        }
        myFun()
    },[]);

    return (
        <div>
            {
                ((!toggle)&&toggleNow)
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
                                                    id={el.id}
                                                    to={`/admin/userList/${el.id}`}
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