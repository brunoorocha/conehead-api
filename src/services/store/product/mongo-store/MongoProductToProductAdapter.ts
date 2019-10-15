import { MoongoProductInterface } from './ProductScheme'
import Product from '../../../../models/Product'

class MongoProductToProductAdapter {
  public static make (mongoProduct: MoongoProductInterface): Product {
    const product = new Product()
    product.id = mongoProduct._id
    product.name = mongoProduct.name
    return product
  }
}

export default MongoProductToProductAdapter
