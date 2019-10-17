"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Measurement = require('../../models/Measurement'); var _Measurement2 = _interopRequireDefault(_Measurement);

/**
 * @param name The name of product that you want to create.
 * @param barcode The barcode of product that you want to create.
 * @param productStore An implementation of ProductStore interface used to store the created product.
 * @returns A Promise with the stored product.
 */
const createProductWorker = async (name, measurementId, barcode = undefined, productStore) => {
  const measurement = new (0, _Measurement2.default)(measurementId, null, null)
  const product = new (0, _Product2.default)(null, name, measurement, barcode)
  const storedProduct = await productStore.save(product)
  return storedProduct
}

exports. default = createProductWorker
