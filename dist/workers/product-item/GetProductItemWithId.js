"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});


const getProductItemWithId = async (productItemId, productItemStore) => {
  const productItem = await productItemStore.get(productItemId)
  return productItem
}

exports. default = getProductItemWithId
