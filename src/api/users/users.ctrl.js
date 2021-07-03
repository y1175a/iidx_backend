const { Users } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const DEFAULT_PAGINATION_LIMIT = 20;

    try {
        const user = await Users.findOne({
            where: { id: id }
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
        const user = await Users.findOne({
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

exports.findUsers = async (ctx, next) => {
    const query = ctx.request.query;
    const page = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : 50;
    const offset = limit * (page - 1);

exports.findUsers = async ctx => {
    const { page, limit, ...query } = ctx.request.query;
    const attributes = {
        ...query,
        limit: limit ? limit * 1 : DEFAULT_PAGINATION_LIMIT,
        offset: page ? limit * (page - 1) : 0
    };

    await getUsers(attributes)
        .then(users => {
            ctx.body = users;
        })
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
};

exports.updateUserInfo = async ctx => {
    const { id } = ctx.params;
    const { iidx_id, iidx_dan, iidx_name } = ctx.request.body;

    await setUserInfo({ iidx_id, iidx_dan, iidx_name }, id)
        .catch(error => { ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); })
}