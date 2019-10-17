"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../../../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _MongoMeasurementToMeasurementAdapter = require('../../measurement/mongo-store/MongoMeasurementToMeasurementAdapter'); var _MongoMeasurementToMeasurementAdapter2 = _interopRequireDefault(_MongoMeasurementToMeasurementAdapter);


class MongoProductToProductAdapter {
  /**
   * This method transforms an object that conforms with MongoProductInterface
   * in an Product object.
   * @param mongoProduct The object of type MongoProductInterface to be adapted
   */
   static async make (mongoProduct) {
    await mongoProduct.populate('measurement').execPopulate()
    const productMeasurement = _MongoMeasurementToMeasurementAdapter2.default.make(mongoProduct.measurement )

    const product = new (0, _Product2.default)(
      mongoProduct._id,
      mongoProduct.name,
      productMeasurement,
      mongoProduct.barcode
    )
    return product
  }
}

exports. default = MongoProductToProductAdapter
