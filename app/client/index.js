import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

import {configureStore} from '../common/store'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'

import Provider from 'react-redux/lib/components/Provider'

import routes from '../common/routes'

let reduxState = {};
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(unescape(__REDUX_STATE__));
    reduxState = Immutable.fromJS(plain)
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
