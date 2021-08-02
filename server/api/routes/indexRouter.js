const express = require('express')
const indexRouter = express();
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const tradeResultsRouter = require('./tradeResultsRouter');

// .../api/...

indexRouter.use('/products', productRouter);
indexRouter.use('/categories', categoryRouter);
indexRouter.use('/trade-results', tradeResultsRouter);

module.exports = indexRouter;