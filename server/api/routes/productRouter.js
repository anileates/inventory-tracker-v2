const express = require('express')
const productRouter = express.Router()
const { addNewProduct, getProduct, updateProduct, getAllOrSearchProduct, deleteProduct} = require('../controllers/product')

// .../api/products/...

productRouter.post('/', addNewProduct)
productRouter.get('/', getAllOrSearchProduct)
productRouter.get('/:productCode', getProduct)
productRouter.put('/:productCode', updateProduct)
productRouter.delete('/:productCode', deleteProduct)


module.exports = productRouter;