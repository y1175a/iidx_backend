const { Charts, Songs, sequelize } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const dataTransfer = chart => {
    const { title, artist, bpm, version } = chart.Song;
    const { id, chart_difficulty, chart_level, chart_skillpoint, notes } = chart;

    return {
        id,
        title,
        artist,
        bpm,
        version,
        difficulty: chart_difficulty,
        level: chart_level,
        skillpoint: chart_skillpoint,
        notes,
    }
}

exports.findChartById = async ctx => {
    const { id } = ctx.params;

    const chart = await Charts.findOne({
        where: { id: id },
        include: Songs
    })
    .then(chart => dataTransfer(chart))
    .catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error);
    });

    if (!chart) {
        ctx.status = StatusCodes.NOT_FOUND; // 404
        return;
    }

    ctx.body = chart;
}

exports.findCharts = async ctx => {
    const { limit, offset } = ctx.query;

    const charts = await Charts.findAll({
        limit: limit ? limit : 50,
        offset: offset ? offset : 1000,
        include: Songs,
    }).then(charts => charts.map(chart => dataTransfer(chart)))
    .catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error);
    });

    if (!charts) {
        ctx.status = StatusCodes.NOT_FOUND; // 404
        return;
    }

    const count = await Charts.count();

    ctx.body = {list: [ ...charts ], last: Math.ceil(count / limit)};
}