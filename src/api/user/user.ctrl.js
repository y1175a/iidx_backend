const { User } = require('../../../models');
const { StatusCodes } = require('http-status-codes');

const DEFAULT_PAGINATION_LIMIT = 20;

/**
 * 데이터베이스에서 조건에 따라 1명의 사용자를 찾습니다.
 * attributes에는 조건을 담습니다. 만약 id가 1인 사용자를 찾는다면
 * attributes parameter에 객체 { id: 1 } 을 전달합니다.
 * 
 * @param {Object} attributes 
 * @returns Promise<User>
 */
const getUser = async attributes => {
    const user = await User.findOne({ where: { ...attributes }});
    return user;
}

/**
 * 데이터베이스에서 조건에 따라 다수의 사용자를 찾습니다.
 * 
 * @param {Object} attributes 
 * @returns Promise<User[]>
 */

const getUsers = async attributes => {
    const users = await User.findAll({ ...attributes });
    return users;
}

const setUserInfo = async (attributes, id) => {
    const result = await User.update({ ...attributes }, { where: { id } });
    return result;
}

/**
 * 1명의 사용자를 찾아 request body에 저장합니다.
 * ctx는 koa 프레임워크의 context 객체입니다.
 * 
 * @param {Object} ctx 
 */
exports.findUser = async ctx => {
    const attributes = ctx.params;

    await getUser(attributes)
        .then(user => {
            ctx.body = user;
        })
        .catch(error => { 
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
}

/**
 * 다수의 사용자를 찾아 request body에 저장합니다.
 * 필수적인 attribute로 포함되는 속성은 limit과 offset이 있습니다.
 * limit은 한 요청당 최대 몇 개의 user 객체를 찾을 것인지,
 * offset은 찾은 user 객체 중 몇 번째부터 보여줄 것인지를 정합니다.
 * 예를 들어 limit이 25이고, offset이 10이라면
 * 10번째로 찾은 user 데이터부터 최대 25개를 차례로 보여줍니다.
 * 
 * @param {Object} ctx 
 */

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