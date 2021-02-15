const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.static('dist/client'));

app.get('*', routes);

app.listen(8000, () => {
  console.log('Listen at http://localhost:8000');
});
