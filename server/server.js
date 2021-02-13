const server = require('express')()
const routes = require('./routes');

server.get('*', routes);

server.listen(8000, () => {
  console.log('Listen at http://localhost:8000')
});
