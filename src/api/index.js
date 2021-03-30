const Router = require('koa-router');
const charts = require('./charts');
const auth = require('./auth');
const user = require('./user');
const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/charts', charts.routes());

module.exports = api;