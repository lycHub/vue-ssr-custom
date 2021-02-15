const { merge } = require('webpack-merge')
const { join } = require('path')
const baseConfig = require('../base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: join(__dirname, '../../src/entry-client.js'),
  devServer: {
    port: 4201,
    contentBase: 'public',
    watchOptions: {
      ignored: ['/node_modules/**', 'webpack.config.js']
    },
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://toutiao.m.lipengzhou.com',
        changeOrigin: true,
        secure: false
      },
    }
  },
  plugins: [
    new VueClientPlugin()
  ]
});
