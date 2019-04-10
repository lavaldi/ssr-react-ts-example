
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
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(rootPath, 'dist'),
    publicPath
  },
  devServer: {
    open: true,
    historyApiFallback: true,
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
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'stylelint-custom-processor-loader'
          }
        ]
      }
    ]
  },
  mode: 'development',
}
