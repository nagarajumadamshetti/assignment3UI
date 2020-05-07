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
    const userName = useSelector((state) => state.userReducer.userName);
    const [toggleProfile, ChangeToggleProfile] = useState(false);
    useEffect(() => {
        const myFun = async () => {
            console.log("useEffect at userPageAtAdmin")
            await dispatch(setUsersUserNameAction(name.id))
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