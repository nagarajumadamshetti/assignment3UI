import React, { Component } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import SignUp from './container/signup/signup';
class App extends Component {
  render() {


    return (
      <div className="App">
       <SignUp></SignUp>
      </div>
    );
  }
}

export default App;
