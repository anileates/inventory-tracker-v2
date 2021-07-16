const { Prisma } = require('@prisma/client')
const asyncErrorWrapper = require('express-async-handler')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient();

const prisma = require('../../prisma/myPrisma')

const addNewCategory = asyncErrorWrapper(async (req, res, next) => {
    const { category_name } = req.body

    let newCategory = await prisma.category.create({
        data: {
            name: category_name
        }
    })

    return res.status(200).json({
        success: true,
        data: newCategory
    })
})

const getAllCategories = asyncErrorWrapper(async (req, res, next) => {
    const categories = await prisma.category.findMany()

    return res.status(200).json({
        success: true,
        categories
    })
})

const updateCategory = asyncErrorWrapper(async (req, res, next) => {
    const categoryId = req.params.categoryId
    const { name } = req.body
    
    const updatedCategory = await prisma.category.update({
        where: { id: parseInt(categoryId) },
        data: { name }
    })

    return res.status(200).json({
        success: true,
        updatedCategory
    })
})

const deleteCategory = asyncErrorWrapper(async (req, res, next) => {
    const categoryId = req.params.categoryId

    await prisma.category.delete({
        where: { id: parseInt(categoryId) }
    })

    return res.status(200).json({
        success: true,
        msg: `Category has been deleted`
    })
})

module.exports = {
    addNewCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}