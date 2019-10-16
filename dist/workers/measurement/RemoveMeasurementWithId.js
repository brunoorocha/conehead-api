"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


const removeMeasurementWithId = async (measurementId, measurementStore) => {
  const measurement = await measurementStore.remove(measurementId)
  return measurement
}

exports. default = removeMeasurementWithId
