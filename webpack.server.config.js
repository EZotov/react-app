const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

let conf = {
  entry: './src/server/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
    // publicPath : '/'
  },
  target : 'node',
  externals: [
        nodeExternals()
    ],
  resolve : {
    extensions : [".tsx", ".ts",".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test : /\.(tsx|ts)$/,
        use : ['babel-loader', 'ts-loader'],
        exclude : '/node_modules/'
      },
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test : /\.(scss|css)$/,
        use : ['null-loader'],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: []
};

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false :'eval-cheap-module-source-map';

  return conf;
};
