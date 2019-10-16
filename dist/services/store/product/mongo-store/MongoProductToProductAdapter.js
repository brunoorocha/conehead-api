"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../../../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class MongoProductToProductAdapter {
  /**
   * This method transforms an object that conforms with MongoProductInterface
   * in an Product object.
   * @param mongoProduct The object of type MongoProductInterface to be adapted
   */
   static make (mongoProduct) {
    const product = new (0, _Product2.default)(
      mongoProduct._id,
      mongoProduct.name
    )
    return product
  }
}

exports. default = MongoProductToProductAdapter
