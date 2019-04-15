const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');

const baseConfig = require('./config.base.js');
const rootPath = path.join(__dirname, '../../server');

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: path.resolve(rootPath, 'index.tsx'),
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: 'ssr.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  },
  externals: [webpackNodeExternals()]
});