import MeasurementController from '../../controllers/MeasurementController'
import express from 'express'

const measurementRoutes = express.Router()
measurementRoutes.get('/measurements', MeasurementController.index)
measurementRoutes.post('/measurements', MeasurementController.store)
measurementRoutes.get('/measurements/:measurementId', MeasurementController.get)
measurementRoutes.delete('/measurements/:measurementId', MeasurementController.remove)

export default measurementRoutes
