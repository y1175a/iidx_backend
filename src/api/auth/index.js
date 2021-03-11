const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const cors = require('@koa/cors');

router.get('/login', passport.authenticate('google', { scope: ['openid', 'email'] }));

router.get('/login/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), ctx => {
    ctx.redirect('http://localhost:3000/');
});

router.get('/login/success', async ctx => {
    ctx.body = { user: ctx.state.user };
});

router.get('/logout', async ctx => {
    try {
        await ctx.logout();
        ctx.status = 200;
        ctx.session = null;
    } catch (err) {
        ctx.throw(err);
    }
    
})

module.exports = router;