const axios = require('axios');
const path = require('path');
const { readFileSync } = require('fs');
const {createBundleRenderer} = require('vue-server-renderer');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const express = require('express');
const router = express.Router({ caseSensitive: true });


const serverConfig = require('../../configs/server');
const {clientPort} = require("../../configs/constant");

function setupDevServer() {
  let ready;
  const onReady = new Promise(r => ready = r);
  const compiler = webpack(serverConfig);
  const mfs = new MemoryFS();
  compiler.outputFileSystem = mfs;
  compiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const serverBundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    ready(JSON.parse(mfs.readFileSync(serverBundlePath, 'utf-8')))
    console.log('new serverBundle generated');
  })
  return onReady;
}

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

router.get('*', async (req, res) => {
  const serverBundle = await setupDevServer();
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }
  res.setHeader("Server", serverInfo);
  const clientBase = 'http://localhost:' + clientPort;
  const clientBundle = await axios.get(clientBase + '/vue-ssr-client-manifest.json')
  const clientManifest = clientBundle.data;
  // clientManifest.publicPath = clientBase;
  const template = readFileSync('public/index.template.html', 'utf-8');
  const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  });
  renderer.renderToString({ url: req.url }, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      throw err;
    }
    res.writeHead(200,{ 'Content-Type': 'text/html;charset=utf-8' });
    res.end(html);
  });
});

module.exports = router;
