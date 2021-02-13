const axios = require('axios');
const path = require('path');
const {createBundleRenderer} = require('vue-server-renderer');
const {readFileSync} = require('fs');
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const express = require('express');
const router = express.Router({ caseSensitive: true });


const serverConfig = require('../../configs/server')
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(warn))
  
  const serverBundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  serverBundle = JSON.parse(mfs.readFileSync(serverBundlePath, 'utf-8'))
  console.log('new serverBundle generated');
})


router.get('*', async (req, res) => {
  if (!serverBundle) {
    res.end('waiting');
  } else {
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }
    console.log('有boundle');
    const context = {
      url: req.url
    }
    const clientBoundle = await axios.get('http://localhost:4201/vue-ssr-client-manifest.json')
    const clientManifest = clientBoundle.data;
    const template = readFileSync('public/index.template.html', 'utf-8');
    const renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template,
      clientManifest
    });
    renderer.renderToString(context, (err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error')
        throw err;
      }
      res.writeHead(200,{ 'Content-Type': 'text/html;charset=utf-8' });
      res.end(html);
    })
  }
});

module.exports = router;
