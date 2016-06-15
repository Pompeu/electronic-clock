const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const app = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src',
    status: 'minimal'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ]
};

if (env === 'development') {
  app.plugins.splice(0,1)
}

module.exports = app;
