const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

const port = 4000;

//router 설정
router.use('/api', api.routes());

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
    console.log('::listening to port ' + port + '::');
})