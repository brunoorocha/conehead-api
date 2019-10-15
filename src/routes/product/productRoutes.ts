import express from 'express'
import ProductController from '../../controllers/ProductController'

const productRoutes = express.Router()
productRoutes.get('/products', ProductController.index)
productRoutes.post('/products', ProductController.store)

export default productRoutes