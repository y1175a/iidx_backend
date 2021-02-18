const Router = require('koa-router');
const user = require('./models/user');
const api = new Router();

api.get('/test',ctx => {
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        params: {
            id: 1,
            uid: 'admin',
            roletype: 1,
            email: 'test@admin.com',
            nickname: 'admin',
            iidx_id: 'admin',
            iidx_name: 'admin',
            iidx_dan: '1'
        },
    };
});

module.exports = api;