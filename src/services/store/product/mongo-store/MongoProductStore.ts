import { ProductStoreContract } from '../ProductStoreContract'
import { MongoProduct } from './ProductScheme'
import MongoProductToProductAdapter from './MongoProductToProductAdapter'
import Product from '../../../../models/Product'

class MongoProductStore implements ProductStoreContract {
  public async fetchAll (): Promise<Product[]> {
    const mongoProducts = await MongoProduct.find()
    const products = mongoProducts.map(mongoProduct => MongoProductToProductAdapter.make(mongoProduct))
    return products
  }

  public async save (name: string): Promise<Product> {
    const mongoProduct = await MongoProduct.create({
      name: name
    })

    return MongoProductToProductAdapter.make(mongoProduct)
  }
}

export default new MongoProductStore()
