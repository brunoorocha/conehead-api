import Store from '../../Store'
import { MongoProduct } from './MongoProductSchema'
import MongoProductToProductAdapter from './MongoProductToProductAdapter'
import Product from '../../../../models/Product'

class MongoProductStore implements Store<Product> {
  public async fetchAll (): Promise<Product[]> {
    const mongoProducts = await MongoProduct.find()
    const products = mongoProducts.map(async mongoProduct => {
      return MongoProductToProductAdapter.make(mongoProduct)
    })

    return Promise.all(products)
  }

  public async save (product: Product): Promise<Product> {
    const mongoProduct = await MongoProduct.create({
      name: product.name,
      barcode: product.barcode,
      measurement: product.measurement.id
    })

    return MongoProductToProductAdapter.make(mongoProduct)
  }

  public async get (productId: string): Promise<Product> {
    const mongoProduct = await MongoProduct.findById(productId)
    return MongoProductToProductAdapter.make(mongoProduct)
  }

  public async remove (productId: string): Promise<Product> {
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
