"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _MongoMeasurementStore = require('../services/store/measurement/mongo-store/MongoMeasurementStore'); var _MongoMeasurementStore2 = _interopRequireDefault(_MongoMeasurementStore);
var _CreateMeasurement = require('../workers/measurement/CreateMeasurement'); var _CreateMeasurement2 = _interopRequireDefault(_CreateMeasurement);
var _ListMeasurements = require('../workers/measurement/ListMeasurements'); var _ListMeasurements2 = _interopRequireDefault(_ListMeasurements);
var _GetMeasurementWithId = require('../workers/measurement/GetMeasurementWithId'); var _GetMeasurementWithId2 = _interopRequireDefault(_GetMeasurementWithId);
var _RemoveMeasurementWithId = require('../workers/measurement/RemoveMeasurementWithId'); var _RemoveMeasurementWithId2 = _interopRequireDefault(_RemoveMeasurementWithId);


class MeasurementController {
  

   constructor (measurementStore = new (0, _MongoMeasurementStore2.default)()) {;MeasurementController.prototype.__init.call(this);MeasurementController.prototype.__init2.call(this);MeasurementController.prototype.__init3.call(this);MeasurementController.prototype.__init4.call(this);
    this.measurementStore = measurementStore
  }

   __init() {this.store = async (req, res) => {
    const name = req.body.name
    const abbreviation = req.body.abbreviation
    const measurement = await _CreateMeasurement2.default.call(void 0, name, abbreviation, this.measurementStore)
    return res.json(measurement)
  }}

   __init2() {this.index = async (req, res) => {
    const measurements = await _ListMeasurements2.default.call(void 0, this.measurementStore)
    return res.json(measurements)
  }}

   __init3() {this.get = async (req, res) => {
    const measurementId = req.params.measurementId
    const measurement = await _GetMeasurementWithId2.default.call(void 0, measurementId, this.measurementStore)
    return res.json(measurement)
  }}

   __init4() {this.remove = async (req, res) => {
    const measurementId = req.params.measurementId
    const removedMeasurement = await _RemoveMeasurementWithId2.default.call(void 0, measurementId, this.measurementStore)
    return res.json(removedMeasurement)
  }}
}

exports. default = new MeasurementController()
