const express = require('express');
const app = express();
const routes = require('./routes');
const {createProxyMiddleware} = require("http-proxy-middleware");

app.use(express.static('dist/client'));

app.use('/api', createProxyMiddleware({
  target: 'https://toutiao.m.lipengzhou.com',
  changeOrigin: true,
  secure: false
}));

app.get('*', routes);

app.listen(8000, () => {
  console.log('Listen at http://localhost:8000');
});
