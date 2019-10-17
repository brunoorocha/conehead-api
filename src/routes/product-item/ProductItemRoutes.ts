import express from 'express'
import ProductItemController from '../../controllers/ProductItemController'

const productItemRoutes = express.Router()
// productRoutes.get('/products', ProductController.index)
productItemRoutes.get('/products/:productId/items', ProductItemController.index)
productItemRoutes.get('/products/:productId/items/:productItemId', ProductItemController.get)
productItemRoutes.post('/products/:productId/items', ProductItemController.store)
// productRoutes.get('/products/:productId', ProductController.get)
// productRoutes.delete('/products/:productId', ProductController.remove)

export default productItemRoutes
