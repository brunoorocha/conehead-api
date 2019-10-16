"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


/**
 * @param productId The id of the product that you want.
 * @param productStore An implementation of ProductStore interface used to fetch the stored product.
 */
const getProductWithId = async (productId, productStore) => {
  const product = await productStore.get(productId)
  return product
}

exports. default = getProductWithId
