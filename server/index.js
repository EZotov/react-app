const path = require('path');

require('ignore-styles');
require( '@babel/register')({
  ignore : [/(node_modules)/],
  configFile: path.resolve( __dirname, '../.babelrc' ),
});

require( './express.js' );
