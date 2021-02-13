const { merge } = require('webpack-merge')
const { join } = require('path')
const baseConfig = require('../base.js')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: join(__dirname, '../../src/entry-client.js'),
  output: {
    path: join(__dirname, '../../dist/client')
  },
  plugins: [
    new VueClientPlugin()
  ]
});
