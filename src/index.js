import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import { Provider } from 'react-redux'

import './css/index.css';
import {App} from './components';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import history from './history'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
