const { User, Skill } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const userDTO = user => {
    return {
        email: user.u_email,
        nickname: user.u_nick,
        iidx_id: user.u_rivalcode,
        dj_name: user.u_djname,
        dj_class: user.u_djclass,
        hot_skillpoint: user.Skill.sp_hot,
        other_skillpoint: user.Skill.sp_other,
    }
}

exports.getUserById = async ctx => {
    const { id } = ctx.params;

    const user = await User.findOne({
        where: { id: id },
        include: Skill
    }).catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
    });

    if (!user) {
        ctx.status = StatusCodes.NOT_FOUND; // 404
        ctx.body = "찾을 수 없습니다."
        return;
    }

    ctx.body = userDTO(user);
}

exports.getUsers = async ctx => {
    const { limit, offset, ...query } = ctx.query;

    const users = await User.findAll({
        limit: limit ? limit : 50,
        offset: offset ? offset : 0,
        include: Skill
    }).catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
    });
        
    if (!users) {
        ctx.status = StatusCodes.NOT_FOUND; // 404
        ctx.body = "찾을 수 없습니다."
        return;
    }

    ctx.body = users.map(user => userDTO(user));
};

exports.updateUser = async ctx => {
    const { id } = ctx.params;

    const { nickname, iidx_id, dj_name, dj_class } = ctx.request.body;

    await User.update({ 
        u_nick: nickname,
        u_rivalcode: iidx_id,
        u_djname: dj_name,
        u_djclass: dj_class, 
    }, { where: { id: id }}).catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
    });

    ctx.body = "프로필 변경 성공";
}