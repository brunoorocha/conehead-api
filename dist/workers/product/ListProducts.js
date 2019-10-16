"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


/**
 * @param productStore An implementation of ProductStore interface used to fetch the stored products.
 * @returns A Promise with the array of all products in productStore
 */
const listProductsWorker = async (productStore) => {
  const products = await productStore.fetchAll()
  return products
}

exports. default = listProductsWorker
