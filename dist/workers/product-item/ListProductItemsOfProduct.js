"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


const listProductItemsOfProduct = async (productId, productItemStore) => {
  const productItems = await productItemStore.fetchAllOfProduct(productId)
  return productItems
}

exports. default = listProductItemsOfProduct
