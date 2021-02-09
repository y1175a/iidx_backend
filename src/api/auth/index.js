const Router = require('koa-router');
const router = new Router();
const passport = require('passport');

router.get('/login', passport.authenticate('google'))

router.get('/login/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), ctx => {
    ctx.response.redirect('/');
});

router.get('/check', ctx => {
    ctx.body = "check";
})

router.post('/logout', ctx => {
    ctx.body = "logout";
})

module.exports = router;