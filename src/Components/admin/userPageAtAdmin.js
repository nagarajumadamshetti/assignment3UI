import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Profile from '../../Containers/userContainers/profileContainer';
import { setUsersUserNameAction } from '../../Actions/adminActions';
import { useParams, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function UserPageAtAdmin() {

    const dispatch = useDispatch();
    const name = useParams();
    const [toggleProfile, ChangeToggleProfile] = useState(false);
    useEffect(() => {
        const myFun = async () => {
            await dispatch(setUsersUserNameAction(name))
            ChangeToggleProfile(true);
        }
        myFun();
    })
    return (
        <div>
            {
                (toggleProfile) ?
                    (<Profile />)
                    :
                    null
            }
        </div>
    )
}
export default withRouter(UserPageAtAdmin);