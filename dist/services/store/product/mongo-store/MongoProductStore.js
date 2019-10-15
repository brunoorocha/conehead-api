"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _ProductScheme = require('./ProductScheme');
var _MongoProductToProductAdapter = require('./MongoProductToProductAdapter'); var _MongoProductToProductAdapter2 = _interopRequireDefault(_MongoProductToProductAdapter);


class MongoProductStore  {
   async fetchAll () {
    const mongoProducts = await _ProductScheme.MongoProduct.find()
    const products = mongoProducts.map(mongoProduct => _MongoProductToProductAdapter2.default.make(mongoProduct))
    return products
  }

   async save (name) {
    const mongoProduct = await _ProductScheme.MongoProduct.create({
      name: name
    })

    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }
}

exports. default = new MongoProductStore()
