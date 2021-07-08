const { Users, Profiles, Skills } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const dataTransfer = user => {
    return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        iidx_id: user.Profile.iidx_id,
        dj_name: user.Profile.dj_name,
        dj_class: user.Profile.dj_class,
        hot_skillpoint: user.Skill.hot_skillpoint,
        other_skillpoint: user.Skill.other_skillpoint
    }
}

exports.findUserById = async (ctx, next) => {
    const { id } = ctx.params;
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

exports.findUsers = async ctx => {
    const { limit, offset, ...query } = ctx.query;

    const attributes = {
        limit: limit ? limit : 50,
        offset: offset ? offset : 0,
        include: [ Profiles, Skills ]
    };

    const users = await Users.findAll(attributes)
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
    

    ctx.body = users.map(user => dataTransfer(user));
};

exports.updateUserInfo = async ctx => {
    const { id } = ctx.params;

    const { nickname, iidx_id, dj_name, dj_class } = ctx.request.body;

    const userForm = { nickname };
    
    const profileForm = { 
        iidx_id,
        dj_name, 
        dj_class,
    };

    const updatedUser = await Users.update(userForm, { where: { id: id }})
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });

    const updatedProfile = await Profiles.update(profileForm, { where: { user_id: id }})
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });

    ctx.body = "프로필 변경 성공";
}