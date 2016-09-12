require('dotenv').config({ silent: true });

var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSASS = new ExtractTextPlugin('[name].[hash].css');

var DEBUG = !(process.env.NODE_ENV === 'production');

var config = {
  devtool: DEBUG ? 'eval' : false,
  entry: {
    app: './app/client'
  },
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: DEBUG ? '[name].js' : '[name].[hash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        HOSTNAME: process.env.HOSTNAME,
        PORT: process.env.PORT
      }),
      __DEV__: DEBUG,
      __CLIENT__: true
    }),
    new AssetsPlugin({path: path.join(__dirname, 'static')})
  ],
  Sassport: {
    indentedSyntax: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap']
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'file'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  }
};

if (DEBUG) {

  config.output.publicPath = 'http://localhost:3030/static/';
  config.entry.app = [
    'webpack-dev-server/client?http://localhost:3030', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    config.entry.app
  ];
  config.module.loaders[0].loaders.unshift('react-hot');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

} else {

  config.plugins = config.plugins.concat([
    extractSASS,
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]);
}

module.exports = config;
