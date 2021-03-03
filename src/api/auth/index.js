const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

router.get('/login', passport.authenticate('google', { scope: ['openid', 'email'] }));

router.get('/login/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), ctx => {
    ctx.response.redirect('http://localhost:3000/');
});

router.get('/check', ctx => {
    ctx.body = "check";
})

router.post('/logout', ctx => {
    ctx.cookies.set('koa.sess', null, { maxAge: 0, httpOnly: true } )
    ctx.cookies.set('koa.sess.sig', null, { maxAge: 0, httpOnly: true } )
})

module.exports = router;