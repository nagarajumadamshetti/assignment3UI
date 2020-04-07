import React, { Component } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import SignUp from './container/signup/signup';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './container/login/login';
import Home from './container/admin/home';
import UserHome from './container/user/userHome';
import {  withRouter } from "react-router-dom";
import UserPageAtAdmin from './container/admin/userPageAtAdmin';
class App extends Component {
  render() {


    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={SignUp}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/admin" exact component={Home}/>
          <Route path="/user" exact component={UserHome}/>
          <Route path="/admin/userList/:id" exact  component={UserPageAtAdmin}/>
        </Router>
      </div>
    );
  }
}

export default App;
// export default withRouter(App);
