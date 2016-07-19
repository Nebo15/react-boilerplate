
import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

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
