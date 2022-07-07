const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let conf = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
        open: true,
        compress: true
    },
  resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
  module: {
    rules: [
      {
        test : /\.(tsx|ts)?$/,
        use : ['ts-loader'],
        exclude : '/node_modules/'
      },
      {
        test: /\.(jsx|js|ts|tsx)$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            autoprefixer
                          ]
                        ]
                      },
                        sourceMap: false
                    }
          },
          "sass-loader"],
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({filename:'bundle.css'}),
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false :'eval-cheap-module-source-map';

  return conf;
};
