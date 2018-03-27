import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './css/index.css';
import {App} from './components';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import history from './history'


ReactDOM.render(
  <MuiThemeProvider >
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'));

registerServiceWorker();
