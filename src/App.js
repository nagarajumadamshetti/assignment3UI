import React, { Component } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import SignUp from './container/signup/signup';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './container/login/login';

import {  withRouter } from "react-router-dom";
class App extends Component {
  render() {


    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={SignUp}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Router>
       
      </div>
    );
  }
}

export default App;
// export default withRouter(App);
