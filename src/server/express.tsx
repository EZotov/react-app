import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { legacy_createStore as createStore } from 'redux';

import App from '../app/app.component';
import { rootReducer } from '../redux/reducers';



const app = express();

app.get(/\.(js|css|map|ico|svg|png|gif|bmp|jpeg|jpg|woff|woff2)$/, express.static(path.resolve( __dirname, '../dist')));

app.use('*', ( req, res) => {
  let indexHTML = fs.readFileSync(path.resolve('./dist/index.html'), {encoding: 'utf8'});

  const store = createStore(rootReducer);

  let appHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  indexHTML = indexHTML.replace('<div class="app"></div>', `<div class="app">${appHTML}</div>`);

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

app.listen('9000', () => {
    console.log('Express server started at <http://localhost:9000>');
} );
