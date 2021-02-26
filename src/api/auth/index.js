const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

router.get('/login', passport.authenticate('google', { scope: ['openid', 'email'] }));

router.get('/login/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), ctx => {
    ctx.response.redirect('http://localhost:4000/api/user');
});

router.post('/register', ctx => {
    const { username, password } = ctx.request.body;
})

// router.post('/login', ctx => {
//     const { username, password } = ctx.request.body;
// })

router.get('/check', ctx => {
    ctx.body = "check";
})

router.post('/logout', ctx => {
    ctx.body = "logout";
})

module.exports = router;