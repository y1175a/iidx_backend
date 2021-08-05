const { Chart, Song, sequelize } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const dataTransfer = chart => {
    const { s_title, s_artist, s_tempo, s_version } = chart.Song;
    const { c_diff, c_level, c_skill, c_notes } = chart;

    return {
        title: s_title,
        artist: s_artist,
        bpm: s_tempo,
        version: s_version,
        difficulty: c_diff,
        level: c_level,
        skillpoint: c_skill,
        notes: c_notes
    }
}

exports.findChartById = async ctx => {
    const { id } = ctx.params;

    const chart = await Chart.findOne({
        where: { id: id },
        include: Song
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

    const charts = await Chart.findAll({
        limit: limit ? limit * 1 : 50,
        offset: offset ? offset * 1 : 0,
        include: Song,
    }).then(charts => charts.map(chart => dataTransfer(chart)))
    .catch(error => {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error);
    });

    if (!charts) {
        ctx.status = StatusCodes.NOT_FOUND; // 404
        return;
    }
    ctx.body = [ ...charts ]
}