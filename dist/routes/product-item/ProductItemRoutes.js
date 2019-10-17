"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _ProductItemController = require('../../controllers/ProductItemController'); var _ProductItemController2 = _interopRequireDefault(_ProductItemController);

const productItemRoutes = _express2.default.Router()
// productRoutes.get('/products', ProductController.index)
productItemRoutes.post('/products/:productId/items', _ProductItemController2.default.store)
// productRoutes.get('/products/:productId', ProductController.get)
// productRoutes.delete('/products/:productId', ProductController.remove)

exports. default = productItemRoutes
