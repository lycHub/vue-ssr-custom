// const prodSsr = require('./prod-ssr');
const devSsr = require('./dev-ssr');
if (process.env.NODE_ENV === 'development') {

}
// router.use('*', prodSsr);
module.exports = devSsr;
