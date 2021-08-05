const Router = require('koa-router');
const router = new Router();
const handler = require('./handler');

// 단일 유저 조회 GET
router.get('/:id', handler.getUserById);

// 다수 유저 조회 GET
router.get('/', handler.getUsers);

// 단일 유저 정보 수정 PATCH
router.patch('/:id', handler.updateUser);

module.exports = router;