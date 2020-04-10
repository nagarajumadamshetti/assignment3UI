import React, { Component } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import SignUp from './container/signup/signup';
import Search from './container/user/search';
import Profile from './container/user/profile';
import Timeline from './container/user/timeline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './container/login/login';
import Home from './container/admin/home';
import UserHome from './container/user/userHome';
import { withRouter } from "react-router-dom";
import UserPageAtAdmin from './container/admin/userPageAtAdmin';
import UserList from './container/admin/userList'
import UserRequests from './container/admin/userRequests'
import AdminRoutes from './RouteContainer/adminRoutes';
import UserRoutes from './RouteContainer/userRoutes';
import SideDrawer from './container/SideDrawer/sideDrawer';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Logout from './container/Logout/logout';
import { createStore } from 'redux';
const store = createStore(reducer);
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
              <Route component={SideDrawer}/>

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
