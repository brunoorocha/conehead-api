"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _MongoProductItemSchema = require('./MongoProductItemSchema');
var _MongoProductItemToProductItemAdapter = require('./MongoProductItemToProductItemAdapter'); var _MongoProductItemToProductItemAdapter2 = _interopRequireDefault(_MongoProductItemToProductItemAdapter);

class MongoProductItemStore  {
   async fetchAll () {
    const mongoProductItems = await _MongoProductItemSchema.MongoProductItem.find()
    const productItems = mongoProductItems.map(mongoProductItem => _MongoProductItemToProductItemAdapter2.default.make(mongoProductItem))
    return Promise.all(productItems)
  }

   async fetchAllOfProduct (productId) {
    const mongoProductItems = await _MongoProductItemSchema.MongoProductItem.find({ product: productId })
    const productItems = mongoProductItems.map(mongoProductItem => _MongoProductItemToProductItemAdapter2.default.make(mongoProductItem))
    return Promise.all(productItems)
  }

   async save (productItem) {
    const mongoProductItem = await _MongoProductItemSchema.MongoProductItem.create({
      quantity: productItem.quantity,
      price: productItem.price,
      expiration: productItem.expiration,
      product: productItem.product.id
    })

    return _MongoProductItemToProductItemAdapter2.default.make(mongoProductItem)
  }

   async get (productItemId) {
    const mongoProductItem = await _MongoProductItemSchema.MongoProductItem.findById(productItemId)
    await mongoProductItem.populate('product').execPopulate()
    return _MongoProductItemToProductItemAdapter2.default.make(mongoProductItem)
  }

   async remove (productItemId) {
    const mongoProductItem = await _MongoProductItemSchema.MongoProductItem.findById(productItemId)
    _MongoProductItemSchema.MongoProductItem.deleteOne({ _id: productItemId }, error => {
      if (error) {
        console.log(error)
      }
    })

    return _MongoProductItemToProductItemAdapter2.default.make(mongoProductItem)
  }
}

exports. default = MongoProductItemStore
