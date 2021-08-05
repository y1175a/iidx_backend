const Router = require('koa-router');
const router = new Router();
const handler = require('./handler');
const passport = require('koa-passport');

router.post('/', handler.parsePlaydata, handler.updatePlaydata);

router.get('/:chartId/user/:userId', handler.getPlaydataOne);

module.exports = router;