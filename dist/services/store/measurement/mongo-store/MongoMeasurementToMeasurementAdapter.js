"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Measurement = require('../../../../models/Measurement'); var _Measurement2 = _interopRequireDefault(_Measurement);

class MongoMeasurementToMeasurementAdapter {
   static make (mongoMeasurement) {
    const measurement = new (0, _Measurement2.default)(
      mongoMeasurement._id,
      mongoMeasurement.name,
      mongoMeasurement.abbreviation
    )

    return measurement
  }
}

exports. default = MongoMeasurementToMeasurementAdapter
