/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = () => merge(common, {
  // Set the mode to production
  mode: 'production',

  // Disable source maps
  devtool: false,

  // Where webpack outputs the assets and bundles
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    // Once your build outputs multiple chunks, this option will
    // ensure they share the webpack runtime instead of having
    // their own. This also helps with long-term caching, since
    // the chunks will only change when actual code changes,
    // not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
  },
});
