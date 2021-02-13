const {createBundleRenderer} = require('vue-server-renderer');
const {readFileSync} = require('fs');
const express = require('express');
const router = express.Router({ caseSensitive: true });
const serverBundle = require('../../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/client/vue-ssr-client-manifest.json')

const template = readFileSync('public/index.template.html', 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

router.get('*', (req, res) => {
  const context = {
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      throw err;
    }
    res.writeHead(200,{ 'Content-Type': 'text/html;charset=utf-8' });
    res.end(html);
  })
});

module.exports = router;
