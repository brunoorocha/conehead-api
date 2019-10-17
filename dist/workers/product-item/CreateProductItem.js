"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _ProductItem = require('../../models/ProductItem'); var _ProductItem2 = _interopRequireDefault(_ProductItem);
var _Product = require('../../models/Product'); var _Product2 = _interopRequireDefault(_Product);

const createProductItem = async (quantity, price, expiration, productId, productItemStore) => {
  const product = new (0, _Product2.default)(productId, null, null)
  const productItem = new (0, _ProductItem2.default)(null, quantity, price, new Date(expiration), new Date(), product)
  const storedProductItem = await productItemStore.save(productItem)
  return storedProductItem
}

exports. default = createProductItem
