const express = require('express')
const productRouter = express.Router()
const { addNewProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/product')

// .../api/products/...

productRouter.post('/', addNewProduct)
productRouter.get('/:productCode', getProduct)
productRouter.put('/:productCode', updateProduct)
productRouter.delete('/:productCode', deleteProduct)



module.exports = productRouter;