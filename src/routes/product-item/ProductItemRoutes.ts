import express from 'express'
import ProductItemController from '../../controllers/ProductItemController'
import { check } from 'express-validator'
import { AuthMiddleware } from '../../middlewares/passport/config'

const productItemRoutes = express.Router()
productItemRoutes.use('/products/:productId/items', AuthMiddleware())
productItemRoutes.get('/products/:productId/items', [check('productId').isMongoId()], ProductItemController.index)
productItemRoutes.get('/products/:productId/items/:productItemId', [check('productId').isMongoId(), check('productItemId').isMongoId()], ProductItemController.get)
productItemRoutes.post('/products/:productId/items', [
  check('quantity').exists().isNumeric(),
  check('price').exists().isNumeric(),
  check('productId').isMongoId()
], ProductItemController.store)

export default productItemRoutes
