const Router = require('koa-router');
const router = new Router();
const playdataCtrl = require('./playdata.ctrl');
const passport = require('koa-passport');

router.post('/', playdataCtrl.parsePlaydata, playdataCtrl.updatePlaydata);

router.get('/:chartId/user/:userId', playdataCtrl.getPlaydataOne);

module.exports = router;