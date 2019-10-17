"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoProductItemStore = require('../services/store/produtc-item/mongo-store/MongoProductItemStore'); var _MongoProductItemStore2 = _interopRequireDefault(_MongoProductItemStore);

var _CreateProductItem = require('../workers/product-item/CreateProductItem'); var _CreateProductItem2 = _interopRequireDefault(_CreateProductItem);
var _ListProductItemsOfProduct = require('../workers/product-item/ListProductItemsOfProduct'); var _ListProductItemsOfProduct2 = _interopRequireDefault(_ListProductItemsOfProduct);
var _GetProductItemWithId = require('../workers/product-item/GetProductItemWithId'); var _GetProductItemWithId2 = _interopRequireDefault(_GetProductItemWithId);

class ProductItemController {
  

   constructor (productItemStore = new (0, _MongoProductItemStore2.default)()) {;ProductItemController.prototype.__init.call(this);ProductItemController.prototype.__init2.call(this);ProductItemController.prototype.__init3.call(this);
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

   __init2() {this.index = async (req, res) => {
    const productId = req.params.productId
    const productItems = await _ListProductItemsOfProduct2.default.call(void 0, productId, this.productItemStore)
    return res.json(productItems)
  }}

   __init3() {this.get = async (req, res) => {
    const productItemId = req.params.productItemId
    const productItem = await _GetProductItemWithId2.default.call(void 0, productItemId, this.productItemStore)
    return res.json(productItem)
  }}
}

exports. default = new ProductItemController()
