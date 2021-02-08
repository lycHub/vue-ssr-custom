const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/*
* import { CleanWebpackPlugin } from "clean-webpack-plugin";
    new CopyPlugin({
      patterns: [
        { from: 'public' }
      ]
    }),
* */

module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    filename: "[name].[contenthash:8].js"
  },
  devServer: {
    port: 4200,
    contentBase: './public',
    watchOptions: {
      ignored: ['/node_modules/**', 'webpack.config.js']
    },
  },
  resolve: {
    alias: {
      // vue$: "vue/dist/vue.esm.js"
    },
    extensions: ['.vue', '.js']
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "vue ssr",
      template: './public/index.html'
    })
  ]
}
