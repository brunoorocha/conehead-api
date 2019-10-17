"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

class Environment {
  
  

   static __initStatic() {this.shared = new Environment()}

   constructor () {
    _dotenv2.default.config({ path: _path2.default.join(__dirname, `../../.env.${process.env.NODE_ENV}`) })
    this.environment = process.env.NODE_ENV
    this.apiUrl = process.env.API_URL
  }
} Environment.__initStatic();

exports. default = Environment
