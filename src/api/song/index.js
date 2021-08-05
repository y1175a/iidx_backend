const Router = require('koa-router');
const router = new Router();
const handler = require('./handler.js')

router.get('/', handler.getSongs);

module.exports = router;