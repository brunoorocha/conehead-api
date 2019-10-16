"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _ProductScheme = require('./ProductScheme');
var _MongoProductToProductAdapter = require('./MongoProductToProductAdapter'); var _MongoProductToProductAdapter2 = _interopRequireDefault(_MongoProductToProductAdapter);


class MongoProductStore  {
   async fetchAll () {
    const mongoProducts = await _ProductScheme.MongoProduct.find()
    const products = mongoProducts.map(mongoProduct => _MongoProductToProductAdapter2.default.make(mongoProduct))
    return products
  }

   async save (product) {
    const mongoProduct = await _ProductScheme.MongoProduct.create({
      name: product.name
    })

    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }

   async get (productId) {
    const mongoProduct = await _ProductScheme.MongoProduct.findById(productId)
    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }

   async remove (productId) {
    const mongoProduct = await _ProductScheme.MongoProduct.findById(productId)
    _ProductScheme.MongoProduct.deleteOne({ _id: productId }, (error) => {
      if (error) {
        console.log(error)
      }
    })
    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }
}

exports. default = MongoProductStore
