import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../container/admin/home';
import UserList from '../container/admin/userList';
import UserRequests from '../container/admin/userRequests';

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