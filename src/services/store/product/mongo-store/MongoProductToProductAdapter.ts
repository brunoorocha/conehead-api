import { MoongoProductInterface } from './ProductScheme'
import Product from '../../../../models/Product'

class MongoProductToProductAdapter {
  /**
   * This method transforms an object that conforms with MongoProductInterface
   * in an Product object.
   * @param mongoProduct The object of type MongoProductInterface to be adapted
   */
  public static make (mongoProduct: MoongoProductInterface): Product {
    const product = new Product()
    product.id = mongoProduct._id
    product.name = mongoProduct.name
    return product
  }
}

export default MongoProductToProductAdapter
