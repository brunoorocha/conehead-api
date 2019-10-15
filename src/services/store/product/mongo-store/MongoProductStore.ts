import { ProductStoreContract } from '../ProductStoreContract'
import { Product as MongoProduct } from './ProductScheme'
import Product from '../../../../models/Product'

class MongoProductStore implements ProductStoreContract {
  public async fetchAll (): Promise<Product[]> {
    const mongoProducts = await MongoProduct.find()
    const products = mongoProducts.map(mongoProduct => {
      const product = new Product()
      product.name = mongoProduct.name
      return product
    })

    return products
  }

  public async save (name: string): Promise<Product> {
    const mongoProduct = await MongoProduct.create({
      name: name
    })

    const product = new Product()
    product.name = mongoProduct.name
    return product
  }
}

export default new MongoProductStore()
