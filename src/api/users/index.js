const Router = require('koa-router');
const router = new Router();
const userCtrl = require('./users.ctrl');

// 유저 조회 GET
router.get('/:id', userCtrl.findUserById);

// 유저 닉네임으로 조회 GET
router.get('/nickname/:nickname', userCtrl.findUserByNickname);

// 모든 유저 검색
router.get('/', userCtrl.findUsers);

router.patch('/:id', userCtrl.updateUserInfo);

module.exports = router;