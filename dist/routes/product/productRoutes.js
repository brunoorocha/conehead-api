"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _ProductController = require('../../controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);

const productRoutes = _express2.default.Router()
productRoutes.get('/products', _ProductController2.default.index)
productRoutes.post('/products', _ProductController2.default.store)
productRoutes.get('/products/:productId', _ProductController2.default.get)
productRoutes.delete('/products/:productId', _ProductController2.default.remove)

exports. default = productRoutes
