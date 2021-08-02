const asyncErrorWrapper = require('express-async-handler')
const prisma = require('../../prisma/myPrisma')


const getTradeResult = asyncErrorWrapper(async (req, res, next) => {
    const tradeResult = await prisma.tradeResult.findFirst()
    console.log(tradeResult)
    return res.status(200).json({
        success: true,
        tradeResult
    })
})

const updateTradeResults = asyncErrorWrapper(async (req, res, next) => {
    const { purchase, sale } = req.body

    let tradeResult = await prisma.tradeResult.findFirst().update({
        purchase,
        sale
    })

    return res.status(200).json({
        success: true,
        tradeResult
    })
})


module.exports = {
    getTradeResult,
    updateTradeResults
}