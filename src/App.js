import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './Containers/signUpContainer'

import Login from './Components/login/login';

import SideDrawer from './Components/SideDrawer/sideDrawer';

import Search from './Containers/userContainers/searchContainer';
import Profile from './Containers/userContainers/profileContainer';
import Timeline from './Containers/userContainers/timelineContainer';
import FollowRequest from './Containers/userContainers/followRequestsContainer';

import UserList from './Components/admin/userList'
import UserRequests from './Components/admin/userRequests';
import UserPageAtAdmin from './Components/admin/userPageAtAdmin';


import { Provider } from 'react-redux';

import reducer from './reducers/index';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">

            <Switch>

              {/* <Route path="/admin/userList/:id" exact component={UserPageAtAdmin}/> */}
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={SignUp} />
              {/* <Logout/> */}
              {/* <Route component={Logout}/> */}
              <Route component={SideDrawer} />

              {/* User path="/user" exact */}
              {/* <Route  component={UserHome} /> */}
              <Route path="/user/profile" component={Profile}></Route>
              <Route path="/user/search" component={Search}></Route>
              <Route path="/user/timeline" component={Timeline}></Route>

              {/* Admin */}
              {/* <Route component={Home} /> */}
              {/* path='/admin' exact */}
              <Route path="/admin/userList" exact component={UserList} />
              <Route path="/admin/userRequests" exact component={UserRequests} />
              {/* <Route path="/admin/userList/:id" exact  component={UserPageAtAdmin} /> */}
              {/* <UserRoutes />
              <AdminRoutes /> */}
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
// export default withRouter(App);
