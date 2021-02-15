const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  output: {
    filename: "[name].[contenthash:8].js"
  },
  resolve: {
    alias: {
      // vue$: "vue/dist/vue.esm.js"
    },
    extensions: ['.vue', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', {
          loader: "css-loader",
          options: {
            // https://blog.csdn.net/vv_bug/article/details/108148263
            esModule: false
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', {
          loader: "css-loader",
          options: {
            // https://blog.csdn.net/vv_bug/article/details/108148263
            esModule: false
          }
        }, 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "vue ssr",
      template: './public/index.html'
    })
  ]
}
