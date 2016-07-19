
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

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
    root: [ path.join(__dirname, 'app') ]
  },
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
      __DEV__: DEBUG
    }),
    new AssetsPlugin({ path: path.join(__dirname, 'static') })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
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
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  filname: 'vendor.js'
    //})
  ]);
  config.output.publicPath = 'http://localhost:3030/static/';
  config.module.loaders[0].query = {
    "env": {
      "development": {
        "presets": ["react-hmre"]
      }
    }
  };
} else {
  config.plugins = config.plugins.concat([
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  filname: '[name].[chunkhash].js'
    //}),
    new webpack.optimize.UglifyJsPlugin()
  ]);
}

module.exports = config;
