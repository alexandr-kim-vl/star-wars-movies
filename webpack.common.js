/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: path.resolve(__dirname, 'src/index.tsx'),

  // Where webpack outputs the assets and bundles
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new HtmlWebpackPlugin({
      title: 'Tengri BPM',
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'public/favicon.png'),
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name]-[sha1:contenthash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
      public: path.join(__dirname, 'public'),
    },
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
};
