"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _greetingRoutes = require('./greeting/greetingRoutes'); var _greetingRoutes2 = _interopRequireDefault(_greetingRoutes);
var _productRoutes = require('./product/productRoutes'); var _productRoutes2 = _interopRequireDefault(_productRoutes);

class AppRouter {
   __init() {this.routes = []}
  

   static __initStatic() {this.shared = new AppRouter()}

   constructor () {;AppRouter.prototype.__init.call(this);
    this.initRoutes()
    this.router = _express.Router.call(void 0, )
    this.router.use(this.routes)
  }

   initRoutes () {
    this.routes.push(_greetingRoutes2.default)
    this.routes.push(_productRoutes2.default)
  }
} AppRouter.__initStatic();

exports. default = AppRouter.shared.router
