"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');










const MongoProductSchema = new (0, _mongoose.Schema)({
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true
})

 const MongoProductItem = _mongoose.model('ProductItem', MongoProductSchema); exports.MongoProductItem = MongoProductItem
