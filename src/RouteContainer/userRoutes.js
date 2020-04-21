import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserHome from '../Components/user/userHome';
import Profile from '../Components/user/profile';
import Search from '../Components/user/search';
import Timeline from '../Components/user/timeline';

const userRoutes = () => {
    return (
        <div>
            <Route path="/user" exact component={UserHome} />
            <Route path="/user/profile" component={Profile}></Route>
            <Route path="/user/search" component={Search}></Route>
            <Route path="/user/timeline" component={Timeline}></Route>
        </div>
    );
}
export default userRoutes;