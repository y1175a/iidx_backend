const Router = require('koa-router');
const userCtrl = require('./user.ctrl');
const user = new Router();
const users = new Router();

// 유저 조회 GET
user.get('/:id', userCtrl.findUser);

user.patch('/:id', userCtrl.updateUserInfo);

// 모든 유저 검색
users.get('/', userCtrl.findUsers);

module.exports = { user, users };