"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _routes = require('../routes'); var _routes2 = _interopRequireDefault(_routes);

class App {
  

   constructor () {
    this.express = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
    this.database()
  }

   middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_bodyparser2.default.urlencoded({ extended: true }))
    this.express.use(_cors2.default.call(void 0, ))
  }

   routes () {
    this.express.use(_routes2.default)
  }

   database () {
    _mongoose2.default.connect('mongodb://conehead:mtyrG99i8%409!pUd@ds335668.mlab.com:35668/heroku_99nr7r2h', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.log(error)
    })
  }
}

exports. default = new App().express
