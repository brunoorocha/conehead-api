import MeasurementController from '../../controllers/MeasurementController'
import express from 'express'

const measurementRoutes = express.Router()
measurementRoutes.get('/measurements', MeasurementController.index)
measurementRoutes.post('/measurements', MeasurementController.store)

export default measurementRoutes
