import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Components/admin/home'
import UserList from '../Components/admin/userList';
import UserRequests from '../Components/admin/userRequests';

const adminRoutes = () => {
    return (
        <div>
                   {/* path='/admin' exact        */}
            <Route  component={Home} />
            <Route path="/admin/userList" exact component={UserList} />
            <Route path="/admin/userRequests" exact component={UserRequests} />
        </div>
    );
}
export default adminRoutes;