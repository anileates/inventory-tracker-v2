const express = require('express')
const categoryRouter = express.Router()
const { addNewCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers/category')

// .../api/categories/...

categoryRouter.get('/', getAllCategories)
categoryRouter.post('/', addNewCategory)
categoryRouter.put('/:categoryId', updateCategory)
categoryRouter.delete('/:categoryId', deleteCategory)


module.exports = categoryRouter;