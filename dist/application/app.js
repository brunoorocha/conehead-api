"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _ProductController = require('../controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);

class App {
  

   constructor () {
    this.express = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
    this.database()
  }

   middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_cors2.default.call(void 0, ))
  }

   routes () {
    this.express.get('/', (_, res) => {
      return res.json({ gretting: 'Welcome to Conehead API 🧙🏼‍♂️' })
    })

    this.express.get('/products', _ProductController2.default.index)
    this.express.post('/products', _ProductController2.default.store)
  }

   database () {
    _mongoose2.default.connect('mongodb://conehead:mtyrG99i8%409!pUd@ds235378.mlab.com:35378/heroku_vjwbmw5s', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.log(error)
    })
  }
}

exports. default = new App().express
