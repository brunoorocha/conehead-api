"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoMeasurementSchema = require('./MongoMeasurementSchema');

var _MongoMeasurementToMeasurementAdapter = require('./MongoMeasurementToMeasurementAdapter'); var _MongoMeasurementToMeasurementAdapter2 = _interopRequireDefault(_MongoMeasurementToMeasurementAdapter);

class MongoMeasurementStore  {
   async fetchAll () {
    const mongoMeasurements = await _MongoMeasurementSchema.MongoMeasurement.find()
    const measurements = mongoMeasurements.map(mongoMeasurement => _MongoMeasurementToMeasurementAdapter2.default.make(mongoMeasurement))
    return measurements
  }

   async save (measurement) {
    const mongoMeasurement = await _MongoMeasurementSchema.MongoMeasurement.create({
      name: measurement.name,
      abbreviation: measurement.abbreviation
    })

    return _MongoMeasurementToMeasurementAdapter2.default.make(mongoMeasurement)
  }

   async get (measurementId) {
    const mongoMeasurement = await _MongoMeasurementSchema.MongoMeasurement.findById(measurementId)
    return _MongoMeasurementToMeasurementAdapter2.default.make(mongoMeasurement)
  }

   async remove (measurementId) {
    const mongoMeasurement = await _MongoMeasurementSchema.MongoMeasurement.findById(measurementId)
    _MongoMeasurementSchema.MongoMeasurement.deleteOne({ _id: measurementId }, error => {
      if (error) {
        console.log(error)
      }
    })

    return _MongoMeasurementToMeasurementAdapter2.default.make(mongoMeasurement)
  }
}

exports. default = MongoMeasurementStore
