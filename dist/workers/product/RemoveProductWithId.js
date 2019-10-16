"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


/**
 * @param productId The id of the product that you want to remove.
 * @param productStore An implementation of ProductStore interface where the product is stored.
 */
const removeProductWithId = async (productId, productStore) => {
  const product = await productStore.remove(productId)
  return product
}

exports. default = removeProductWithId
