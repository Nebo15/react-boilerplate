import React from 'react';
import ReactDOM from 'react-dom';

import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'

import {configureStore} from '../common/store'
import routes from '../common/routes'

let reduxState = {};
if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__));
  } catch (e) {
  }
}

const store = configureStore(reduxState);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'));
