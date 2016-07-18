
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers'

let middlewares = [thunkMiddleware];

if (__DEV__) {
  middlewares.push(require('redux-freeze'));
}

const createStoreWithMiddleware = compose(
  applyMiddleware.apply(this, middlewares),
  __DEV__ && global.window && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export function configureStore (initialState) {

  const store = createStoreWithMiddleware(rootReducer, initialState);

  //if (module.hot) {
  //  // Enable Webpack hot module replacement for reducers
  //  module.hot.accept('../reducers', () => {
  //    const nextRootReducer = require('../reducers');
  //    store.replaceReducer(nextRootReducer);
  //  });
  //}

  return store;
}
