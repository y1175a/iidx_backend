const Router = require('koa-router');
const router = new Router();
const chartsCtrl = require('./charts.ctrl');

router.get('/:id', chartsCtrl.findChartById);

router.get('/', chartsCtrl.findCharts);

module.exports = router;