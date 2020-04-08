import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserHome from '../container/user/userHome';
import Profile from '../container/user/profile';
import Search from '../container/user/search';
import Timeline from '../container/user/timeline';

const userRoutes = () => {
    return (
        <div>
              <Route path="/user" exact  component={UserHome} />
              <Route path="/user/profile" component={Profile}></Route>
              <Route path="/user/search" component={Search}></Route>
              <Route path="/user/timeline" component={Timeline}></Route>
        </div>
    );
}
export default userRoutes;