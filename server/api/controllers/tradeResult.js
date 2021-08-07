const asyncErrorWrapper = require('express-async-handler')
const prisma = require('../../prisma/myPrisma')


const getTradeResult = asyncErrorWrapper(async (req, res, next) => {
    const tradeResult = await prisma.tradeResult.findFirst()
    return res.status(200).json({
        success: true,
        tradeResult
    })
})

const updateTradeResults = asyncErrorWrapper(async (req, res, next) => {
    const { purchase, sale } = req.body

    let tradeResult = await prisma.tradeResult.upsert({
        where: { id: 1},
        update: {
            sale: sale,
            purchase: purchase
        },
        create: { sale: sale, purchase: purchase }
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