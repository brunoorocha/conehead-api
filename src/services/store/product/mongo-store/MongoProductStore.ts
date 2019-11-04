import OwnableDataStore from '../../OwnableDataStore'
import { MongoProduct } from './MongoProductSchema'
import MongoProductToProductAdapter from './MongoProductToProductAdapter'
import Product from '../../../../models/Product'

class MongoProductStore implements OwnableDataStore<Product> {
  public async fetchAll (ownerId: string): Promise<Product[]> {
    const mongoProducts = await MongoProduct.find()
    const products = mongoProducts.map(async mongoProduct => {
      return MongoProductToProductAdapter.make(mongoProduct)
    })

    return Promise.all(products)
  }

  public async save (product: Product, ownerId: string): Promise<Product> {
    const mongoProduct = await MongoProduct.create({
      name: product.name,
      barcode: product.barcode,
      measurement: product.measurement.id
    })

    return MongoProductToProductAdapter.make(mongoProduct)
  }

  public async get (productId: string, ownerId: string): Promise<Product> {
    const mongoProduct = await MongoProduct.findById(productId)
    return MongoProductToProductAdapter.make(mongoProduct)
  }

  public async remove (productId: string, ownerId: string): Promise<Product> {
    const mongoProduct = await MongoProduct.findById(productId)

    MongoProduct.deleteOne({ _id: productId }, (error) => {
      if (error) {
        console.log(error)
      }
    })
    return MongoProductToProductAdapter.make(mongoProduct)
  }
}

export default MongoProductStore
