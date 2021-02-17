const { User } = require('../../../models');
const { StatusCodes } = require('http-status-codes');

exports.find = async (ctx, next) => {
    const { uid } = ctx.params;

    try {
        const user = await User.findOne({
            where: { uid: uid }
        });
        if (!user) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }
        ctx.body = user;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}

exports.findUserByNickname = async (ctx, next) => {
    const { nickname } = ctx.params;

    try {
        const user = await User.findOne({
            where: { nickname: nickname }
        });
        if (!user) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }
        ctx.body = user;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}

exports.findUserByIidxId = async (ctx, next) => {
    const { id } = ctx.params;

    try {
        const user = await User.findOne({
            where: { iidx_id: id }
        });
        if (!user) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }
        ctx.body = user;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}

exports.findUsers = async (ctx, next) => {
    const query = ctx.request.query;
    const page = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : 50;
    const offset = limit * (page - 1);

    try { 
        const users = await User.findAll({
            limit: limit,
            offset: offset
        });

        if (!users) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }

        ctx.body = users;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}