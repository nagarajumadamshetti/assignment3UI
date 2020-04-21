import React, { Component } from 'react';
import './App.css';
import SignUp from './Components/signup/signup';
import Search from './Components/user/search';
import Profile from './Components/user/profile';
import Timeline from './Components/user/timeline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/login/login';
import UserList from './Components/admin/userList'
import UserRequests from './Components/admin/userRequests';
import SideDrawer from './Components/SideDrawer/sideDrawer';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
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
