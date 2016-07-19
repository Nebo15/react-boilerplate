require('dotenv').config();

var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractSASS = new ExtractTextPlugin('[name].[hash].css');

var DEBUG = !(process.env.NODE_ENV === 'production');
var env = {
  NODE_ENV: process.env.NODE_ENV,
  API_HOST: process.env.API_HOST
};

var config = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: './app/client'
  },
  resolve: {
    root: [
      'app'
    ]
  },
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
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
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.sass$/,
        loaders: ['style','css', 'autoprefixer', 'sassport']
      }
    ]
  }
};


if (DEBUG) {
  config.entry.dev = [
    'webpack-dev-server/client?http://localhost:3030',
    'webpack/hot/only-dev-server'
  ];

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
  config.output.publicPath = 'http://localhost:3030/static/';
  config.module.loaders[0].query = {
    'env': {
      'development': {
        'presets': ['react-hmre']
      }
    }
  };

} else {

  config.module.loaders[1].loader = extractSASS.extract(['css?minimize', 'autoprefixer', 'sassport']);
  delete config.module.loaders[1].loaders;

  config.plugins = config.plugins.concat([
    extractSASS,
    new webpack.optimize.UglifyJsPlugin()
  ]);
}

module.exports = config;
