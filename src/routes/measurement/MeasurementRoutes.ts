import MeasurementController from '../../controllers/MeasurementController'
import express from 'express'
import { check } from 'express-validator'

const measurementRoutes = express.Router()
measurementRoutes.get('/measurements', MeasurementController.index)
measurementRoutes.post('/measurements', [check('name').exists(), check('abbreviation').exists()], MeasurementController.store)
measurementRoutes.get('/measurements/:measurementId', [check('measurementId').isMongoId()], MeasurementController.get)
measurementRoutes.delete('/measurements/:measurementId', [check('measurementId').isMongoId()], MeasurementController.remove)

export default measurementRoutes
