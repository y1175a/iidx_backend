const Router = require('koa-router');
const chart = require('./chart');
const auth = require('./auth');
const user = require('./user');
const song = require('./song');
const record = require('./record');
const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/chart', chart.routes());
api.use('/song', song.routes());
api.use('/record', record.routes());


module.exports = api;