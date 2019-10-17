"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _ProductItem = require('../../../../models/ProductItem'); var _ProductItem2 = _interopRequireDefault(_ProductItem);
var _MongoProductToProductAdapter = require('../../product/mongo-store/MongoProductToProductAdapter'); var _MongoProductToProductAdapter2 = _interopRequireDefault(_MongoProductToProductAdapter);

var _Product = require('../../../../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class MongoProductItemToProductItemAdapter {
   static async make (mongoProductItem) {
    let product

    if ((mongoProductItem.product ).name) {
      product = await _MongoProductToProductAdapter2.default.make(mongoProductItem.product )
    } else {
      product = new (0, _Product2.default)((mongoProductItem.product ), undefined, undefined, undefined)
    }

    const productItem = new (0, _ProductItem2.default)(
      mongoProductItem._id,
      mongoProductItem.quantity,
      mongoProductItem.price,
      mongoProductItem.expiration,
      mongoProductItem.createdAt,
      product
    )

    return productItem
  }
}

exports. default = MongoProductItemToProductItemAdapter
