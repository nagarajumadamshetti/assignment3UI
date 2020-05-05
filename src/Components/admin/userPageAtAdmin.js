import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Profile from '../../Containers/userContainers/profileContainer';
import { setUsersUserNameAction } from '../../Actions/adminActions';
import { useParams, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function UserPageAtAdmin() {

    const dispatch = useDispatch();
    const name  = useParams();
    const userName = useSelector((state) => state.userReducer.userName);

    useEffect(() => {
        dispatch(setUsersUserNameAction(name.id))
    },[name])
    return (
        <div>
            <Profile />
        </div>
    )
}
export default withRouter(UserPageAtAdmin);