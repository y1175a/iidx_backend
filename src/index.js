require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const passport = require('passport');
const cors = require('cors');

const api = require('./api');

const app = new Koa();
const router = new Router();

const port = 4000;

//router 설정
router.use('/api', api.routes());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods()).use(cors());
app.listen(port, () => {
    console.log('::listening to port ' + port + '::');
})