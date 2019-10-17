"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);

const greetingRoutes = _express2.default.Router()
greetingRoutes.get('/', (_, res) => {
  return res.json({ gretting: 'Welcome to Conehead API 🧙🏼‍♂️' })
})

exports. default = greetingRoutes
