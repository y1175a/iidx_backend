const Router = require('koa-router');
const { chart, charts } = require('./charts');
const auth = require('./auth');
const user = require('./users');
const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/users', users.routes());
api.use('/chart', chart.routes());
api.use('/charts', charts.routes());

module.exports = api;