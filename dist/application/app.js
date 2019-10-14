"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

class App {
  
   constructor () {
    this.express = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
  }

   middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_cors2.default.call(void 0, ))
  }

   routes () {
    this.express.get('/', (_, res) => {
      return res.json({ gretting: 'Welcome to Conehead API 🧙🏼‍♂️' })
    })
  }
}

exports. default = new App().express
