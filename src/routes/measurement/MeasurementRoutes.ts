import MeasurementController from '../../controllers/MeasurementController'
import express from 'express'

const measurementRoutes = express.Router()
measurementRoutes.get('/measurements', MeasurementController.index)
measurementRoutes.post('/measurements', MeasurementController.store)
measurementRoutes.get('/measurements/:measurementId', MeasurementController.get)

export default measurementRoutes
