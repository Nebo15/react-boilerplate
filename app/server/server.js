import Express from 'express';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouterHistory, RouterContext, match, Router} from 'react-router';

import { createMemoryHistory, useQueries } from 'history';
import Promise from 'bluebird';

import { Provider } from 'react-redux';

import {configureStore} from '../common/store';
import routes from '../common/routes'

let server = new Express();

server.set('port', process.env.PORT || 8080);

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.get('*', function (req, res, next) {

  let history = useRouterHistory(useQueries(createMemoryHistory))();
  let store = configureStore();

  let router = <Router history={history}>{routes}</Router>;
  let location = history.createLocation(req.url);

  match({routes: router, location}, (error, redirectLocation, renderProps) => {

    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
      let reqUrl = location.pathname + location.search;

      getReduxPromise().then(()=> {
          let reduxState = escape(JSON.stringify(store.getState()));
          let html = ReactDOMServer.renderToString(
            <Provider store={store}>
              { <RouterContext {...renderProps}/> }
            </Provider>
          );

          if (getCurrentUrl() === reqUrl) {
            res.render('index', {html, reduxState});
          } else {
            res.redirect(302, getCurrentUrl());
          }
          unsubscribe();
        })
        .catch((err)=> {
          unsubscribe();
          next(err);
        });

      function getReduxPromise() {
        let { query, params } = renderProps;

        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        let promise = comp.fetchData ?
          comp.fetchData({query, params, store, history}) :
          Promise.resolve();

        return promise;
      }
    }
  });

  function subscribeUrl() {
    let currentUrl = location.pathname + location.search;
    let unsubscribe = history.listen((newLoc)=> {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });
    return [
      ()=> currentUrl,
      unsubscribe
    ];
  }

});

server.use((err, req, res, next)=> {
  console.log(err.stack);
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
});

server.listen(server.get('port'), function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + server.get('port'));
});
