const express = require('express');
const app = express();
const routes = require('./routes');
const {serverPort} = require("../configs/constant");
const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(express.static('dist/client'));

app.use('/api', createProxyMiddleware({
  target: 'https://toutiao.m.lipengzhou.com',
  changeOrigin: true,
  secure: false
}));

app.get('*', routes);

app.listen(serverPort, () => {
  console.log('Listen at http://localhost:' + serverPort);
});
