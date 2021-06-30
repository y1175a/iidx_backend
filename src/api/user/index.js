const Router = require('koa-router');
const router = new Router();
const userCtrl = require('./user.ctrl');

// 유저 조회 GET
router.get('/:id', userCtrl.find);

// 유저 조회 GET
router.get('/userid/:uid', userCtrl.findUserByUid);

// 유저 닉네임으로 조회 GET
router.get('/nickname/:nickname', userCtrl.findUserByNickname);

// 유저 IIDX 아이디로 조회 GET
router.get('/iidxid/:id', userCtrl.findUserByIidxId);

// 모든 유저 검색
router.get('/', userCtrl.findUsers);

// // 유저 정보 수정 POST
// router.post('/', userCtrl.save);

module.exports = router;