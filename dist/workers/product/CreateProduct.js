"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../models/Product'); var _Product2 = _interopRequireDefault(_Product);

/**
 * @param name The name of product that you want to create.
 * @param productStore An implementation of ProductStore interface used to store the created product.
 * @returns A Promise with the stored product.
 */
const createProductWorker = async (name, productStore) => {
  const product = new (0, _Product2.default)(null, name)
  const storedProduct = await productStore.save(product)
  return storedProduct
}

exports. default = createProductWorker
