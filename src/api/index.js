const Router = require('koa-router');
const charts = require('./charts');
const auth = require('./auth');
const users = require('./users');
const songs = require('./songs');
const playdata = require('./playdata');
const api = new Router();

api.use('/auth', auth.routes());
api.use('/users', users.routes());
api.use('/charts', charts.routes());
api.use('/songs', songs.routes());
api.use('/playdata', playdata.routes());


module.exports = api;