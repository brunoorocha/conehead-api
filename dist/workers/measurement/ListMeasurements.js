"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


const listMeasurements = async (measurementStore) => {
  const measurements = await measurementStore.fetchAll()
  return measurements
}

exports. default = listMeasurements
