const Router = require('koa-router');
const router = new Router();
const SongsCtrl = require('./songs.ctrl.js')

router.get('/', SongsCtrl.getSongs);

module.exports = router;