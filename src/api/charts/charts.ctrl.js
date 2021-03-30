const { Charts } = require('../../../models');
const { StatusCodes } = require('http-status-codes');

exports.getChartById = async (ctx, next) => {
    const { id } = ctx.params;

    try {
        const chart = await Charts.findOne({
            where: { id: id }
        });
        if (!chart) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }
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
            offset: offset
        });

        if (!charts) {
            ctx.status = StatusCodes.NOT_FOUND; // 404
            return;
        }

        ctx.body = charts;
    } catch (e) {
        ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, e); // 500
    }
}