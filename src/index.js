import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store from './app/store';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import reducer from './reducers/index';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
const store = createStore(reducer);
const history = createBrowserHistory();
ReactDOM.render(
  
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <Router history={history}>
      <App />
      </Router>
      {/* </BrowserRouter> */}
    </Provider>

  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
