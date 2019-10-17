"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _GreetingRoutes = require('./greeting/GreetingRoutes'); var _GreetingRoutes2 = _interopRequireDefault(_GreetingRoutes);
var _ProductRoutes = require('./product/ProductRoutes'); var _ProductRoutes2 = _interopRequireDefault(_ProductRoutes);
var _MeasurementRoutes = require('./measurement/MeasurementRoutes'); var _MeasurementRoutes2 = _interopRequireDefault(_MeasurementRoutes);

class AppRouter {
   __init() {this.routes = []}
  

   static __initStatic() {this.shared = new AppRouter()}

   constructor () {;AppRouter.prototype.__init.call(this);
    this.initRoutes()
    this.router = _express.Router.call(void 0, )
    this.router.use('/api/v1/', this.routes)
  }

   initRoutes () {
    this.routes.push(_GreetingRoutes2.default)
    this.routes.push(_ProductRoutes2.default)
    this.routes.push(_MeasurementRoutes2.default)
  }
} AppRouter.__initStatic();

exports. default = AppRouter.shared.router
