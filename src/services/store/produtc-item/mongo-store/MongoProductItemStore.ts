import ProductItem from '../../../../models/ProductItem'
import ProductItemStore from '../ProductItemStore'
import { MongoProductItem } from './MongoProductItemSchema'
import MongoProductItemToProductItemAdapter from './MongoProductItemToProductItemAdapter'

class MongoProductItemStore implements ProductItemStore {
  public async fetchAll (): Promise<ProductItem[]> {
    const mongoProductItems = await MongoProductItem.find()
    const productItems = mongoProductItems.map(mongoProductItem => MongoProductItemToProductItemAdapter.make(mongoProductItem))
    return Promise.all(productItems)
  }

  public async fetchAllOfProduct (productId: string): Promise<ProductItem[]> {
    const mongoProductItems = await MongoProductItem.find({ product: productId })
    const productItems = mongoProductItems.map(mongoProductItem => MongoProductItemToProductItemAdapter.make(mongoProductItem))
    return Promise.all(productItems)
  }

  public async save (productItem: ProductItem): Promise<ProductItem> {
    const mongoProductItem = await MongoProductItem.create({
      quantity: productItem.quantity,
      price: productItem.price,
      expiration: productItem.expiration,
      product: productItem.product.id
    })

    return MongoProductItemToProductItemAdapter.make(mongoProductItem)
  }

  public async get (productItemId: string): Promise<ProductItem> {
    const mongoProductItem = await MongoProductItem.findById(productItemId)
    mongoProductItem.populate('product').execPopulate()
    return MongoProductItemToProductItemAdapter.make(mongoProductItem)
  }

  public async remove (productItemId: string): Promise<ProductItem> {
    const mongoProductItem = await MongoProductItem.findById(productItemId)
    MongoProductItem.deleteOne({ _id: productItemId }, error => {
      if (error) {
        console.log(error)
      }
    })

    return MongoProductItemToProductItemAdapter.make(mongoProductItem)
  }
}

export default MongoProductItemStore
