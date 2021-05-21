const { Charts, sequelize } = require('../../../models');
const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const getChart = async attributes => {
    const chart = await Charts.findOne({ where: { ...attributes }});
    return chart;
}

const getCharts = async () => {
    const charts = await Charts.findAll();
    return charts;
}

exports.findChart = async (ctx, next) => {
    const attributes = ctx.params;

    await getChart(attributes)
        .then(chart => {
            ctx.body = chart;
        })
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
}

exports.findCharts = async (ctx, next) => {
    await getCharts()
        .then(charts => {
            ctx.body = charts;
        })
        .catch(error => {
            ctx.throw(StatusCodes.INTERNAL_SERVER_ERROR, error); 
        });
}