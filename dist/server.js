"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./application/app'); var _app2 = _interopRequireDefault(_app);

const port = process.env.PORT || 3333
_app2.default.listen(port)
console.log(`Conehead API is ready and listen on port ${port}!`)
