const { Op } = require("sequelize");
const { User, Song, Chart, Record } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const findUser = async rivalcode => await User.findOne({
    where: { u_rivalcode: rivalcode },
})

const findChart = async data => await Song.findOne({
    where: { s_title: data.title },
    include: Chart
}).then(song => song.get())
    .then(({ Charts }) => Charts.map(chart => chart.get()).filter(chart => chart.c_diff === data.difficulty)[0])
    
const calculateSkillpoint = (skill, score, notes) => (score / notes) * 2 * skill * 200;

const updateRecord = async (data, user, chart) => {
    const existData = await Record.findOne({
        where: {[Op.and]: [
            { user_id: user.id },
            { chart_id: chart.id }
        ]}
    })
    
    if (existData){
        await Record.update({
            r_rank: data.rank,
            r_score: data.score,
            r_cleartype: data.cleartype,
            r_skillpoint: calculateSkillpoint(chart.c_skill, data.score, chart.c_notes),
        }, {
            where: {
                [Op.and]: [
                    { user_id: user.id },
                    { chart_id: chart.id }
                ]
            }
        });
    } else {
        await Record.create({
            user_id: user.id,
            chart_id: chart.id,
            r_rank: data.rank,
            r_score: data.score,
            r_pgreat: data.pgreat,
            r_great: data.great,
            r_cleartype: data.cleartype,
            r_skillpoint: calculateSkillpoint(chart.c_skill, data.score, chart.c_notes),
        });
    }
}

exports.parseRecord = (ctx, next) => {
    const { records, id } = ctx.request.body;
    ctx.state.records = JSON.parse(decodeURIComponent(records));
    ctx.state.id = id;
    return next();
}

exports.updateRecord = async (ctx) => {
    const { records, id } = ctx.state;

    const user = await findUser(id)
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });;

    const missingList = []

    for (const record of records) {

        const chart = await findChart(record).catch(error => {
            missingList.push(record.title);
        });

        if (chart) {
            await updateRecord(record, user, chart).catch(error => {
                ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
            });
        }

    }
    ctx.body = "다음의 곡은 아직 업데이트되지 않았습니다. " + missingList;
}

exports.getRecordOne = async (ctx) => {
    const { userId, chartId } = ctx.params;
    const record = await Record.findOne({
        where: {[Op.and]: [
            { user_id: userId },
            { chart_id: chartId }
        ]}
    })
    ctx.body = record;
}

