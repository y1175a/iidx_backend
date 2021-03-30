const Router = require('koa-router');
const router = new Router();
const chartsCtrl = require('./charts.ctrl');

router.get('/', chartsCtrl.getCharts);

router.get('/:id', chartsCtrl.getChartById);

module.exports = router;