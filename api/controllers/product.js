const asyncErrorWrapper = require('express-async-handler')
const prisma = require('../../prisma/myPrisma')
const { search } = require('../routes/productRouter')

const addNewProduct = asyncErrorWrapper(async (req, res, next) => {
    const { categoryId, name, stock, unitPrice } = req.body

    const productCreated = await prisma.product.create({
        data: {
            name,
            categoryId,
            stock,
            unitPrice
        }
    })

    return res.status(200).json({
        success: true,
        productCreated
    })
})

const getProduct = asyncErrorWrapper(async (req, res, next) => {
    const { productCode } = req.params

    const product = await prisma.product.findUnique({
        where: {
            code: productCode.toString()
        },
        include: {
            category: true
        }
    })

    return res.status(200).json({
        success: true,
        product
    })
})

const updateProduct = asyncErrorWrapper(async (req, res, next) => {
    const { productCode } = req.params

    const product = await prisma.product.update({
        where: {
            code: productCode.toString()
        },
        data: req.body

    })

    return res.status(200).json({
        success: true,
        product
    })
})

const deleteProduct = asyncErrorWrapper(async (req, res, next) => {
    const { productCode } = req.params

    await prisma.product.delete({
        where: {
            code: productCode
        }
    })

    return res.status(200).json({
        success: true,
        message: `Product has been deleted`
    })
})

const searchProduct = asyncErrorWrapper(async (req, res, next) => {
   const searchKey = req.query.search.trim()
   console.log(searchKey)

   const products = await prisma.product.findMany({
       where: {
           name: {
               contains: searchKey
           }
       }
   })

    return res.status(200).json({
        success: true,
        products
    })
})

module.exports = {
    addNewProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}
