"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoProductItemStore = require('../services/store/produtc-item/mongo-store/MongoProductItemStore'); var _MongoProductItemStore2 = _interopRequireDefault(_MongoProductItemStore);

var _CreateProductItem = require('../workers/product-item/CreateProductItem'); var _CreateProductItem2 = _interopRequireDefault(_CreateProductItem);

class ProductItemController {
  

   constructor (productItemStore = new (0, _MongoProductItemStore2.default)()) {;ProductItemController.prototype.__init.call(this);
    this.productItemStore = productItemStore
  }

   __init() {this.store = async (req, res) => {
    const productId = req.params.productId
    const quantity = req.body.quantity
    const price = req.body.price
    const expiration = req.body.expiration

    const product = await _CreateProductItem2.default.call(void 0, quantity, price, expiration, productId, this.productItemStore)
    return res.json(product)
  }}
}

exports. default = new ProductItemController()
