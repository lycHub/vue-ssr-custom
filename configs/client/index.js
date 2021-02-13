const dev = require('./dev');
const prod = require('./prod');

module.exports = env => {
  const isProd = env.production === true;
  return isProd ? prod : dev;
}
