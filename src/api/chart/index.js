const Router = require('koa-router');
const router = new Router();
const handler = require('./handler');

router.get('/:id', handler.findChartById);

router.get('/', handler.findCharts);

module.exports = router;