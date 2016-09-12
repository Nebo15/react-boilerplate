
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import IndexPage from '../containers/pages/IndexPage'

export default (
  <Route path="/">
    <IndexRoute component={IndexPage} />
  </Route>
)
