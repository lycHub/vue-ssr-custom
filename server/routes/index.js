const devSsr = require('./dev-ssr');
if (process.env.NODE_ENV === 'development') {
  module.exports = devSsr;
} else {
  module.exports = require('./prod-ssr');
}
