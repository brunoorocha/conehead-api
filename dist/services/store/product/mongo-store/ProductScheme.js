"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');





const ProductSchema = new (0, _mongoose.Schema)({
  name: String
}, {
  timestamps: true
})

 const MongoProduct = _mongoose.model('Product', ProductSchema); exports.MongoProduct = MongoProduct
