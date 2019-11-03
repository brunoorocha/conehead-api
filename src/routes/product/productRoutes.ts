import express from 'express'
import ProductController from '../../controllers/ProductController'
import passport from 'passport'
import { check } from 'express-validator'

const productRoutes = express.Router()
productRoutes.get('/products', passport.authenticate('jwt', { session: false }), ProductController.index)
productRoutes.post('/products', [check('name').isLength({ min: 3 }), check('measurementId').isMongoId()], ProductController.store)
productRoutes.get('/products/:productId', [check('productId').isMongoId()], ProductController.get)
productRoutes.delete('/products/:productId', [check('productId').isMongoId()], ProductController.remove)

export default productRoutes
