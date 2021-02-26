require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const passportConfig = require('./passport');
const cors = require('@koa/cors');

const api = require('./api');

const app = new Koa();
const router = new Router();

const port = process.env.PORT;

//router 설정
router.use('/api', api.routes());

passportConfig();

//app 인스턴스에 라우터 적용
app.use(bodyParser());
app.keys = [process.env.CLIENT_SECRET];
app.use(session({
    maxAge: 60 * 60 * 1000,
    resave: true,
    saveUninitialized: false
}, app));
app.use(passport.initialize()).use(passport.session());
app.use(router.routes()).use(router.allowedMethods()).use(cors());
app.listen(port, () => {
    console.log('::listening to port ' + port + '::');
})