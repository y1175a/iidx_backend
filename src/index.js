require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const passportStrategy = require('./passport/strategy');
const passportSerialize = require('./passport/serialize');
const cors = require('@koa/cors');

const api = require('./api');

const app = new Koa();
const router = new Router();

const port = process.env.PORT;

//router 설정
router.use('/api', api.routes());

passportStrategy();

//app 인스턴스에 라우터 적용
app.use(bodyParser());
app.keys = [process.env.CLIENT_SECRET];
app.use(session({
    maxAge: 60 * 60 * 1000,
    resave: true,
    saveUninitialized: false,
    secure: false,
}, app));
app.use(passport.initialize()).use(passport.session());
app.use(router.routes()).use(router.allowedMethods());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    })
  );
passportSerialize();
app.listen(port, () => {
    console.log('::listening to port ' + port + '::');
})