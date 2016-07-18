
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import MainLayout from '../containers/layouts/MainLayout'
import IndexPage from '../containers/pages/IndexPage'
import AboutPage from '../containers/pages/AboutPage'
import PostPage from '../containers/pages/PostPage'

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={IndexPage} />
    <Route path="about" component={AboutPage} />
    <Route path="posts/:id" component={PostPage} />
  </Route>
)
