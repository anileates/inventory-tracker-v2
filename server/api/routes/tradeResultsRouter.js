const express = require('express')
const tradeResultsRouter = express.Router()
const { getTradeResult, updateTradeResults } = require('../controllers/tradeResult')

tradeResultsRouter.get('/', getTradeResult)
tradeResultsRouter.put('/', updateTradeResults)


module.exports = tradeResultsRouter;