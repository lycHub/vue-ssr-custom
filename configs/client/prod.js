const { merge } = require('webpack-merge')
const { join } = require('path')
const baseConfig = require('../base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: join(__dirname, '../../src/entry-client.js'),
  output: {
    path: join(__dirname, '../../dist/client')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new VueClientPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    })
  ]
});
