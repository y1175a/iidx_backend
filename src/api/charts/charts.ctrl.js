const { Charts, Songs, sequelize } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

exports.getChartById = async (ctx, next) => {
    const { id } = ctx.params;

    try {
        const chart = await Charts.findOne({
            where: { id: id },
            include: Songs
        }).then(chart => {
            const { title, artist, bpm, version } = chart.Song;
            const { chart_difficulty, chart_level, chart_skillpoint, notes } = chart;

            return {
                title,
                artist,
                bpm,
                version,
                difficulty: chart_difficulty,
                level: chart_level,
                skillpoint: chart_skillpoint,
                notes,
            }
        });
        ctx.body = chart;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}

exports.getCharts = async (ctx, next) => {
    const query = ctx.request.query;
    const page = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : 50;
    const offset = limit * (page - 1);

    try { 
        const charts = await Charts.findAll({
            limit: limit,
            offset: offset,
            include: Songs,
        }).then(charts => charts.map(chart => {
            const { title, artist, bpm, version } = chart.Song;
            const { chart_difficulty, chart_level, chart_skillpoint, notes } = chart;

            return {
                title,
                artist,
                bpm,
                version,
                difficulty: chart_difficulty,
                level: chart_level,
                skillpoint: chart_skillpoint,
                notes,
            }
        }));
        
        if (!charts) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }

        const count = await Charts.count();

        ctx.body = {list: [ ...charts ], last: Math.ceil(count / limit)};

    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}