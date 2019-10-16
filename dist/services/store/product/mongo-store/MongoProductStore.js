"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoProductSchema = require('./MongoProductSchema');
var _MongoProductToProductAdapter = require('./MongoProductToProductAdapter'); var _MongoProductToProductAdapter2 = _interopRequireDefault(_MongoProductToProductAdapter);


class MongoProductStore  {
   async fetchAll () {
    const mongoProducts = await _MongoProductSchema.MongoProduct.find()
    const products = mongoProducts.map(async mongoProduct => {
      return _MongoProductToProductAdapter2.default.make(mongoProduct)
    })

    return Promise.all(products)
  }

   async save (product) {
    const mongoProduct = await _MongoProductSchema.MongoProduct.create({
      name: product.name,
      barcode: product.barcode,
      measurement: product.measurement.id
    })

    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }

   async get (productId) {
    const mongoProduct = await _MongoProductSchema.MongoProduct.findById(productId)
    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }

   async remove (productId) {
    const mongoProduct = await _MongoProductSchema.MongoProduct.findById(productId)

    _MongoProductSchema.MongoProduct.deleteOne({ _id: productId }, (error) => {
      if (error) {
        console.log(error)
      }
    })
    return _MongoProductToProductAdapter2.default.make(mongoProduct)
  }
}

exports. default = MongoProductStore
