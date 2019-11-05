import ProductItem from '../../../../models/ProductItem'
import ProductItemStore from '../ProductItemStore'
import { MongoProductItem, MongoProductItemInterface } from './MongoProductItemSchema'
import MongoProductItemToProductItemAdapter from './MongoProductItemToProductItemAdapter'
import { Types } from 'mongoose'
import { UnauthorizedObjectAccessError, ObjectNotFoundError, UnableToRemoveObjectError, UnableToCreateObjectError } from '../../../../models/errors/DataStoreErrors'
import OwnableDataStore from '../../OwnableDataStore'
import Product from '../../../../models/Product'
import MongoProductStore from '../../product/mongo-store/MongoProductStore'

class MongoProductItemStore implements ProductItemStore {
  public productStore: OwnableDataStore<Product>

  public constructor (productStore: OwnableDataStore<Product> = new MongoProductStore()) {
    this.productStore = productStore
  }

  public async fetchAll (ownerId: string): Promise<ProductItem[]> {
    const mongoProductItems = await MongoProductItem.find({ owner: ownerId })
    const productItems = mongoProductItems.map(mongoProductItem => MongoProductItemToProductItemAdapter.make(mongoProductItem))
    return Promise.all(productItems)
  }

  public fetchAllOfProduct = async (productId: string, ownerId: string): Promise<ProductItem[]> => {
    try {
      const product = await this.productStore.get(productId, ownerId)
      const mongoProductItems = await MongoProductItem.find({ product: product.id, owner: ownerId })
      const productItems = mongoProductItems.map(mongoProductItem => MongoProductItemToProductItemAdapter.make(mongoProductItem))
      return Promise.all(productItems)
    } catch (error) {
      if (error instanceof UnauthorizedObjectAccessError || error instanceof ObjectNotFoundError) {
        return Promise.reject(new ObjectNotFoundError('Product', productId))
      }
    }
  }

  public async save (productItem: ProductItem, ownerId: string): Promise<ProductItem> {
    try {
      const product = await this.productStore.get(productItem.product.id, ownerId)
      const mongoProductItem = await MongoProductItem.create({
        quantity: productItem.quantity,
        price: productItem.price,
        expiration: productItem.expiration,
        product: product.id,
        owner: ownerId
      })

      return MongoProductItemToProductItemAdapter.make(mongoProductItem)
    } catch (error) {
      if (error instanceof UnauthorizedObjectAccessError || error instanceof ObjectNotFoundError) {
        return Promise.reject(new ObjectNotFoundError('Product', productItem.product.id))
      }

      return Promise.reject(new UnableToCreateObjectError(error.message))
    }
  }

  public get = async (productItemId: string, ownerId: string): Promise<ProductItem> => {
    const mongoProductItem = await this.findMongoProductItemForOwner(productItemId, ownerId)
    await mongoProductItem.populate('product').execPopulate()
    return MongoProductItemToProductItemAdapter.make(mongoProductItem)
  }

  public async remove (productItemId: string, ownerId: string): Promise<ProductItem> {
    const mongoProductItem = await this.findMongoProductItemForOwner(productItemId, ownerId)

    MongoProductItem.deleteOne({ _id: productItemId }, error => {
      if (error) {
        return Promise.reject(new UnableToRemoveObjectError(error))
      }
    })

    return MongoProductItemToProductItemAdapter.make(mongoProductItem)
  }

  private async findMongoProductItemForOwner (productItemId: string, ownerId: string): Promise<MongoProductItemInterface> {
    const mongoProductItem = await MongoProductItem.findById(productItemId)

    if (!mongoProductItem) {
      return Promise.reject(new ObjectNotFoundError('Product Item', productItemId))
    }

    const mongoProductItemOwnerId = Types.ObjectId(mongoProductItem.owner)
    if (!mongoProductItemOwnerId.equals(ownerId)) {
      return Promise.reject(new UnauthorizedObjectAccessError())
    }

    return mongoProductItem
  }
}

export default MongoProductItemStore
