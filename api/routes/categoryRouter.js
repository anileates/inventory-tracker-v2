const express = require('express')
const categoryRouter = express.Router()
const { addNewCategory, getAllCategories, updateCategory, deleteCategory, getAllProductsByCategory } = require('../controllers/category')

// .../api/categories/...

categoryRouter.get('/', getAllCategories)
categoryRouter.post('/', addNewCategory)
categoryRouter.put('/:categoryId', updateCategory)
categoryRouter.delete('/:categoryId', deleteCategory)

categoryRouter.get('/:categoryId', getAllProductsByCategory)


module.exports = categoryRouter;