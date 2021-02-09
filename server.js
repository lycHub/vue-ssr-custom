const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')

// const bundlePath = path.join('dist', 'server', 'vue-ssr-server-bundle.json')
// const serverBundle = fs.readFileSync(bundlePath, 'utf-8')

const serverBundle = require('./dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/client/vue-ssr-client-manifest.json')

const template = fs.readFileSync('./public/index.template.html', 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

server.get('*', (req, res) => {
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
})

server.listen(8000, () => {
  console.log('Listen at http://localhost:8000')
});
