const { merge } = require('webpack-merge')
const { join } = require('path')
const baseConfig = require('./base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: join(__dirname, '../src/entry-client.js'),
  output: {
    path: join(__dirname, '../dist/client')
  },
  devServer: {
    port: 4200,
    watchOptions: {
      ignored: ['/node_modules/**', 'webpack.config.js']
    },
    historyApiFallback: true
  },
  plugins: [
    new VueClientPlugin()
  ]
})
