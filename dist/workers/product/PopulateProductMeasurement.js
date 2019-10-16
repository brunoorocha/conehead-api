"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});



const populateProductMeasurement = async (product, measurementStore) => {
  const measurement = await measurementStore.get(product.measurementId)
  const poupulatedProduct = { ...product }
  poupulatedProduct.measurement = measurement
  poupulatedProduct.measurementId = undefined
  return poupulatedProduct
}

exports. default = populateProductMeasurement
