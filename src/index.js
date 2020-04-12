import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import reducer from './reducers/index';
// import { createStore } from 'redux';
// import { createBrowserHistory } from 'history';
// const store = createStore(reducer);
// const history = createBrowserHistory();
ReactDOM.render(
  
    // <Provider store={store}>
      // {/* <BrowserRouter> */}
      // {/* <Router history={history}> */}
      //       {/* </Router> */}
      // {/* </BrowserRouter> */}
    // </Provider>
<App />

  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
