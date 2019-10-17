"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');








const MongoProductSchema = new (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: false
  },
  measurement: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Measurement'
  }
}, {
  timestamps: true
})

 const MongoProduct = _mongoose.model('Product', MongoProductSchema); exports.MongoProduct = MongoProduct
