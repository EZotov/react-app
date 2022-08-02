import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import App from '../app/app.component';
import { loadHallsRequest } from '../redux/actions/http.actions';
import { rootReducer } from '../redux/reducers';
import { mainSagaWatcher } from '../redux/saga';



const app = express();

app.get(/\.(js|css|map|ico|svg|png|gif|bmp|jpeg|jpg|woff|woff2|json)$/, express.static(path.resolve( __dirname, '../dist')));

app.use('*', (req, res) => {
  let indexHTML = fs.readFileSync(path.resolve('./dist/index.html'), {encoding: 'utf8'});
  const reSaga = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(reSaga));


  reSaga.run(mainSagaWatcher).toPromise().then(() => {
      const preloadedState = store.getState();
      const appHTML = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.originalUrl}>
            <App />
          </StaticRouter>
        </Provider>
      );

      indexHTML = indexHTML.replace('<div class="app"></div>', `<div class="app">${appHTML}</div>`);

      indexHTML = indexHTML.replace(
        `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Сервис бронирования столов</title><script defer="defer" src="bundle.js"></script><link href="bundle.css" rel="stylesheet"></head>`,
        `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Сервис бронирования столов</title><script defer="defer" src="bundle.js"></script><link href="bundle.css" rel="stylesheet"><script defer="defer">window.REDUX_DATA = ${JSON.stringify(preloadedState)}</script></head>`)
      res.contentType('text/html');
      res.status(200);
      res.send(indexHTML);
    })
    .catch(() => res.status(500));
    console.log(req.url);
    switch(req.originalUrl) {
      case '/administration':
        store.dispatch(loadHallsRequest());
        break;
      case '/':
        store.dispatch(loadHallsRequest());
        break;
      default:
        break;
    }

    store.dispatch(END);
});

app.listen('9000', () => {
    console.log('Express server started at <http://localhost:9000>');
} );
