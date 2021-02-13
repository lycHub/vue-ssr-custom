const prodSsr = require('./prod-ssr')
if (process.env.NODE_ENV === 'development') {

}
// router.use('*', prodSsr);
module.exports = prodSsr;
