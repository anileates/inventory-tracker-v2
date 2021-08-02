const asyncErrorWrapper = require('express-async-handler')
const prisma = require('../../prisma/myPrisma')
const { search } = require('../routes/productRouter')

const addNewProduct = asyncErrorWrapper(async (req, res, next) => {
    const { categoryId, name, stock, unitPrice, description, imageUrl } = req.body
   
    const productCreated = await prisma.product.create({
        data: {
            name,
            categoryId: parseInt(categoryId),
            stock: parseInt(stock),
            unitPrice: parseFloat(unitPrice),
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

const getAllOrSearchProduct = asyncErrorWrapper(async (req, res, next) => {
    let products = []
    if(req.query && req.query.search){
        const searchKey = req.query.search.trim()

        products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchKey
                }
            }
        })
    }else{
        products = await prisma.product.findMany();
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
    getAllOrSearchProduct
}
