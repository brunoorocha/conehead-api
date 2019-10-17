"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');






const MongoMeasurementSchema = new (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

 const MongoMeasurement = _mongoose.model('Measurement', MongoMeasurementSchema); exports.MongoMeasurement = MongoMeasurement
