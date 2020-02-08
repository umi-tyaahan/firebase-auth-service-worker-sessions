'use strict';

const path = require('path');

const config = {
  context: __dirname,
  entry: {
    'javascripts/sw-register': './app/sw-register.js',
    'javascripts/login': './app/login.js',
    'javascripts/logout': './app/logout.js',
    'sw': './app/sw.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
  },
  resolve: {
    extensions: ['.js'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'none',
  optimization: {
    minimize: true
  }
}

module.exports = config;
