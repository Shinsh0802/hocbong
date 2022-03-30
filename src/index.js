import React from 'react'
import ReactDOM from 'react-dom';
import "./index.css"
import {BrowserRouter} from 'react-router-dom';
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

document.title = "TSNT";
ReactDOM.render(
  <React.StrictMode >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);