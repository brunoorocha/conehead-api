"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _MongoProductStore = require('../services/store/product/mongo-store/MongoProductStore'); var _MongoProductStore2 = _interopRequireDefault(_MongoProductStore);

class ProductController {
   async store (req, res) {
    const name = req.body.name
    const product = await _MongoProductStore2.default.save(name)
    return res.json(product)
  }

   async index (req, res) {
    const products = await _MongoProductStore2.default.fetchAll()
    return res.json(products)
  }
}

exports. default = new ProductController()
