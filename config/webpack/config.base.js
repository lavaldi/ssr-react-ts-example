const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootPath = path.join(__dirname, '../../client');

const publicPath = '/';

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': path.join(rootPath, 'src/index.tsx')
  },
  output: {
    path: path.join(rootPath, 'dist'),
    publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': rootPath
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootPath, 'public/index.html'),
    }),
  ]
}
