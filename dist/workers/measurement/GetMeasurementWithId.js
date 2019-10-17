"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


const getMeasurementWithId = async (measurementId, measurementStore) => {
  const measurement = await measurementStore.get(measurementId)
  return measurement
}

exports. default = getMeasurementWithId
