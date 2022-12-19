import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './views/App.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from '../src/Redux/store'

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
        <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
