"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoProductStore = require('../services/store/product/mongo-store/MongoProductStore'); var _MongoProductStore2 = _interopRequireDefault(_MongoProductStore);

var _CreateProduct = require('../workers/product/CreateProduct'); var _CreateProduct2 = _interopRequireDefault(_CreateProduct);
var _ListProducts = require('../workers/product/ListProducts'); var _ListProducts2 = _interopRequireDefault(_ListProducts);
var _GetProductWithId = require('../workers/product/GetProductWithId'); var _GetProductWithId2 = _interopRequireDefault(_GetProductWithId);
var _RemoveProductWithId = require('../workers/product/RemoveProductWithId'); var _RemoveProductWithId2 = _interopRequireDefault(_RemoveProductWithId);

class ProductController {
  

  /**
   * @param productStore Dependency injection of an implementation of ProductStore interface. It can be ommited because is used an MongoProductStore object for default.
   */
   constructor (productStore = new (0, _MongoProductStore2.default)()) {;ProductController.prototype.__init.call(this);ProductController.prototype.__init2.call(this);ProductController.prototype.__init3.call(this);ProductController.prototype.__init4.call(this);
    this.productStore = productStore
  }

  /**
   * This method is used to create a product in the productStore. To create a product is
   * needed to pass its name in res.body.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the created product in json format through Reques.json() method.
   */
   __init() {this.store = async (req, res) => {
    const name = req.body.name
    console.log(name)
    const product = await _CreateProduct2.default.call(void 0, name, this.productStore)
    return res.json(product)
  }}

  /**
   * This method returns all products stored the productStore used in this ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the list of products in json format through Reques.json() method.
   */
   __init2() {this.index = async (_, res) => {
    const products = await _ListProducts2.default.call(void 0, this.productStore)
    return res.json(products)
  }}

  /**
   * This method remove a product from the product store used by ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns a product in json format through Reques.json() method.
   */
   __init3() {this.get = async (req, res) => {
    const productId = req.params.productId
    const product = await _GetProductWithId2.default.call(void 0, productId, this.productStore)
    return res.json(product)
  }}

   __init4() {this.remove = async (req, res) => {
    const productId = req.params.productId
    const removedProduct = await _RemoveProductWithId2.default.call(void 0, productId, this.productStore)
    return res.json(removedProduct)
  }}
}

exports. default = new ProductController()
