"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Measurement = require('../../models/Measurement'); var _Measurement2 = _interopRequireDefault(_Measurement);

const createMeasurement = async (name, abbreviation, measurementStore) => {
  const measurement = new (0, _Measurement2.default)(null, name, abbreviation)
  const storedMeasurement = await measurementStore.save(measurement)
  return storedMeasurement
}

exports. default = createMeasurement
