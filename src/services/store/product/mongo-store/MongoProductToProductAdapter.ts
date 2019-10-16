import { MongoProductInterface } from './MongoProductSchema'
import Product from '../../../../models/Product'
import MongoMeasurementToMeasurementAdapter from '../../measurement/mongo-store/MongoMeasurementToMeasurementAdapter'
import { MongoMeasurementInterface } from '../../measurement/mongo-store/MongoMeasurementSchema'

class MongoProductToProductAdapter {
  /**
   * This method transforms an object that conforms with MongoProductInterface
   * in an Product object.
   * @param mongoProduct The object of type MongoProductInterface to be adapted
   */
  public static async make (mongoProduct: MongoProductInterface): Promise<Product> {
    await mongoProduct.populate('measurement').execPopulate()
    const productMeasurement = MongoMeasurementToMeasurementAdapter.make(mongoProduct.measurement as MongoMeasurementInterface)

    const product = new Product(
      mongoProduct._id,
      mongoProduct.name,
      productMeasurement,
      mongoProduct.barcode
    )
    return product
  }
}

export default MongoProductToProductAdapter
