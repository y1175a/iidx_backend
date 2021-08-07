const Router = require('koa-router');
const router = new Router();
const handler = require('./handler');
const passport = require('koa-passport');

router.post('/', handler.parseRecord, handler.updateRecord);

router.get('/:chartId/user/:userId', handler.getRecordOne);

module.exports = router;