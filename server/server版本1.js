const Vue = require('vue')
const server = require('express')()
const vueServerRender = require('vue-server-renderer')
const fs = require('fs')
const createApp = require('./app')

const renderer = vueServerRender.createRenderer({
  template: fs.readFileSync('./public/index.template.html', 'utf-8'),
  runInNewContext: false
});

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)
  renderer.renderToString(app, { title: 'hello ssr' }, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.writeHead(200,{ 'Content-Type': 'text/html;charset=utf-8' });
    res.end(html);
  })
})

server.listen(8080, () => {
  console.log('Listen at http://localhost:8080')
});
