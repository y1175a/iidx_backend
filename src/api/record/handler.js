const { Op } = require("sequelize");
const { Users, Songs, Profiles, Charts, Playdata } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const findUserId = async id => await Profiles.findOne({
    where: { iidx_id: id },
}).then(profile => profile.user_id)
.catch(error => {
    ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
});

const findChart = async (data) => await Songs.findOne({
    where: { title: data.title },
    include: Charts
}).then(song => song.get())
    .then(({ Charts }) => Charts.map(chart => chart.get()))
    .then(charts => charts.filter(chart => chart.chart_difficulty === data.difficulty)[0])

const updatePlaydata = async (data, chart, userId) => {
    const existData = await Playdata.findOne({
        where: {[Op.and]: [
            { user_id: userId },
            { chart_id: chart.id }
        ]}
    })

    const rate = data.score / (chart.notes * 2)
    const skillpoint = chart.chart_skillpoint * rate * 200;
    
    if (existData){
        await Playdata.update({
            rank: data.rank,
            score: data.score,
            pgreat: data.pgreat,
            great: data.great,
            cleartype: data.cleartype,
            skillpoint: skillpoint.toFixed(2),
        }, { where: {[Op.and]: [
            { user_id: userId },
            { chart_id: chart.id }
        ]}});
    } else {
        await Playdata.create({
            chart_id: chart.id,
            user_id: userId,
            rank: data.rank,
            score: data.score,
            pgreat: data.pgreat,
            great: data.great,
            cleartype: data.cleartype,
            skillpoint: skillpoint.toFixed(2),
        });
    }
}

exports.parsePlaydata = (ctx, next) => {
    const { playdata, id } = ctx.request.body;
    ctx.state.playdata = JSON.parse(decodeURIComponent(playdata));
    console.log(ctx.state.playdata);
    ctx.state.id = id;
    return next();
}

exports.updatePlaydata = async (ctx) => {
    const userId = await findUserId(ctx.state.id).catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
    });;
    const playdata = ctx.state.playdata;
    const missingList = []
    for (const data of playdata) {
        const chart = await findChart(data).catch(error => {
            missingList.push(data.title);
        });
        if (chart) await updatePlaydata(data, chart, userId).catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
    }
    ctx.body = "다음의 곡은 아직 업데이트되지 않았습니다. " + missingList;
}

exports.getPlaydataOne = async (ctx) => {
    const { chartId, userId } = ctx.params;
    const playdata = await Playdata.findOne({
        where: {[Op.and]: [
            { user_id: userId },
            { chart_id: chartId }
        ]}
    })
    ctx.body = playdata;
}

