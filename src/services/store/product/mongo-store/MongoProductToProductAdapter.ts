import { ProductSchemaInterface } from './ProductScheme'
import Product from '../../../../models/Product'

class MongoProductToProductAdapter {
  public static make (mongoProduct: ProductSchemaInterface): Product {
    const product = new Product()
    product.name = mongoProduct.name
    return product
  }
}

export default MongoProductToProductAdapter
