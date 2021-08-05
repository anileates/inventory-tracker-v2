const express = require('express')
const productRouter = express.Router()
const { addNewProduct, getProduct, updateProduct, getAllOrSearchProduct, deleteProduct, sellProduct} = require('../controllers/product')

// .../api/products/...

productRouter.post('/', addNewProduct)
productRouter.get('/', getAllOrSearchProduct)
productRouter.get('/:productCode', getProduct)
productRouter.put('/:productCode', updateProduct)
productRouter.delete('/:productCode', deleteProduct)
productRouter.post('/sell-product/:productCode', sellProduct)

module.exports = productRouter;