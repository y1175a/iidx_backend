require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('@koa/cors');
const passport = require('koa-passport');
const passportStrategy = require('./passport/strategy');
const passportSerialize = require('./passport/serialize');
const api = require('./api');
const app = new Koa();
const router = new Router();
const port = process.env.PORT;

//router 설정
router.use('/api', api.routes());

//passport 전략 사용
passportStrategy();

app.use(bodyParser({
  formLimit: "2mb",
}));
app.keys = [process.env.CLIENT_SECRET];
app.use(session({
    maxAge: 60 * 60 * 1000,
    resave: true,
    saveUninitialized: false,
    secure: false,
}, app));
app.use(passport.initialize()).use(passport.session());
app.use(router.routes()).use(router.allowedMethods());
app.use(cors());
passportSerialize();

app.listen(port, () => {
    console.log('::listening to port ' + port + '::');
})

module.exports = app;