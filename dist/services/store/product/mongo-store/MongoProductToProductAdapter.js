"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../../../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class MongoProductToProductAdapter {
   static make (mongoProduct) {
    const product = new (0, _Product2.default)()
    product.id = mongoProduct._id
    product.name = mongoProduct.name
    return product
  }
}

exports. default = MongoProductToProductAdapter
