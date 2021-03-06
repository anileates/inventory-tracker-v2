const asyncErrorWrapper = require('express-async-handler')
const prisma = require('../../prisma/myPrisma')
const {search} = require('../routes/productRouter')

const addNewProduct = asyncErrorWrapper(async (req, res, next) => {
    const {categoryId, name, stock, unitPurchasePrice, unitSalePrice, description, imageUrl} = req.body

    const productCreated = await prisma.product.create({
        data: {
            name,
            categoryId: parseInt(categoryId),
            stock: parseInt(stock),
            unitPurchasePrice: parseFloat(unitPurchasePrice),
            unitSalePrice: parseFloat(unitSalePrice),
            description,
            imageUrl
        }
    })

    return res.status(200).json({
        success: true,
        productCreated
    })
})

const getProduct = asyncErrorWrapper(async (req, res, next) => {
    const {productCode} = req.params

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
    const {productCode} = req.params

    let productUpdated = req.body
    //Data manipulation to avoid prisma type error
    productUpdated.stock = parseInt(productUpdated.stock)
    productUpdated.unitPurchasePrice = parseInt(productUpdated.unitPurchasePrice)
    productUpdated.unitSalePrice = parseInt(productUpdated.unitSalePrice)
    productUpdated.categoryId = productUpdated.category.id
    delete productUpdated.category

    const product = await prisma.product.update({
        where: {
            code: productCode.toString()
        },
        data: productUpdated
    })

    return res.status(200).json({
        success: true,
        product
    })
})

const sellProduct = asyncErrorWrapper(async (req, res, next) => {
    const {productCode} = req.params
    const {stockSold} = req.body

    const product = await prisma.product.updateMany({
        where: {
            code: productCode.toString(),
            stock: {
                gte: parseInt(stockSold)
            }
        },
        data: {
            stock: {
                decrement: stockSold
            }
        }
    })

    return res.status(200).json({
        success: true,
        product
    })
})

const deleteProduct = asyncErrorWrapper(async (req, res, next) => {
    const {productCode} = req.params

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

const getAllOrSearchProduct = asyncErrorWrapper(async (req, res, next) => {
    let products = []
    if (req.query && req.query.search) {
        const searchKey = req.query.search.trim()

        products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchKey
                }
            },
            select: {
                categoryId: false,
                category: true,
                name: true,
                stock: true,
                unitSalePrice: true,
                unitPurchasePrice: true,
                description: true,
                imageUrl: true,
                code: true
            }
        })
    } else {
        products = await prisma.product.findMany({
            select: {
                categoryId: false,
                category: true,
                name: true,
                stock: true,
                unitSalePrice: true,
                unitPurchasePrice: true,
                description: true,
                imageUrl: true,
                code: true
            }
        });
    }

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
    getAllOrSearchProduct,
    sellProduct
}
