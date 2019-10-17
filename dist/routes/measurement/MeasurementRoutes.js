"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _MeasurementController = require('../../controllers/MeasurementController'); var _MeasurementController2 = _interopRequireDefault(_MeasurementController);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

const measurementRoutes = _express2.default.Router()
measurementRoutes.get('/measurements', _MeasurementController2.default.index)
measurementRoutes.post('/measurements', _MeasurementController2.default.store)
measurementRoutes.get('/measurements/:measurementId', _MeasurementController2.default.get)
measurementRoutes.delete('/measurements/:measurementId', _MeasurementController2.default.remove)

exports. default = measurementRoutes
