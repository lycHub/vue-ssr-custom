const { join } = require('path')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: join(__dirname, '../src/entry-server.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    path: join(__dirname, '../dist/server'),
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js'
  },
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    allowlist: /\.css$/
  }),

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
})
