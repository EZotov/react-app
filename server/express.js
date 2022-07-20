const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );

const ReactDOMServer = require('react-dom/server');
const React = require('react');

const { App } = require('../src/app/app.component.tsx');

const app = express();

app.get( /\.(js|css|map|ico|svg|png|gif|bmp|jpeg|jpg|woff|woff2)$/, express.static(path.resolve( __dirname, '../dist' )));

app.use('*', ( req, res ) => {
  let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html'), {
      encoding: 'utf8',
  });

  console.log(App);

  let appHTML = ReactDOMServer.renderToString(<App/>);
  indexHTML = indexHTML.replace( '<div class="app"></div>', `<div class="app">${appHTML}</div>` );

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

app.listen( '9000', () => {
    console.log( 'Express server started at <http://localhost:9000>' );
} );
