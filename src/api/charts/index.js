const Router = require('koa-router');
const chart = new Router();
const charts = new Router();
const chartsCtrl = require('./charts.ctrl');

chart.get('/:id', chartsCtrl.findChart);

charts.get('/', chartsCtrl.findCharts);

module.exports = { chart, charts };