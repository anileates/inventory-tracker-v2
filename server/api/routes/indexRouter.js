const express = require('express')
const indexRouter = express();
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');

// .../api/...

indexRouter.use('/products', productRouter);
indexRouter.use('/categories', categoryRouter);

module.exports = indexRouter;