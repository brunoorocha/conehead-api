import express from 'express'
import ProductItemController from '../../controllers/ProductItemController'

const productItemRoutes = express.Router()
// productRoutes.get('/products', ProductController.index)
productItemRoutes.post('/products/:productId/items', ProductItemController.store)
// productRoutes.get('/products/:productId', ProductController.get)
// productRoutes.delete('/products/:productId', ProductController.remove)

export default productItemRoutes
