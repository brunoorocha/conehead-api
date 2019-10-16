import { MongoProductInterface } from './MongoProductSchema'
import Product from '../../../../models/Product'

class MongoProductToProductAdapter {
  /**
   * This method transforms an object that conforms with MongoProductInterface
   * in an Product object.
   * @param mongoProduct The object of type MongoProductInterface to be adapted
   */
  public static make (mongoProduct: MongoProductInterface): Product {
    const product = new Product(
      mongoProduct._id,
      mongoProduct.name,
      mongoProduct.measurement,
      mongoProduct.barcode
    )
    return product
  }
}

export default MongoProductToProductAdapter
