import ProductStore from '../ProductStore'
import Store from '../../Store'
import { MongoProduct } from './MongoProductSchema'
import MongoProductToProductAdapter from './MongoProductToProductAdapter'
import Product from '../../../../models/Product'
import { Types } from 'mongoose'
import { UnauthorizedObjectAccessError, UnableToRemoveObjectError, ObjectNotFoundError, UnableToCreateObjectError, NotFoundProductWithBarcode } from '../../../../models/errors/DataStoreErrors'
import Measurement from '../../../../models/Measurement'
import MongoMeasurementStore from '../../measurement/mongo-store/MongoMeasurementStore'

class MongoProductStore implements ProductStore {
  private measurementStore: Store<Measurement>

  public constructor (measurementStore = new MongoMeasurementStore()) {
    this.measurementStore = measurementStore
  }

  public async fetchAll (ownerId: string): Promise<Product[]> {
    const mongoProducts = await MongoProduct.find({ owner: ownerId })
    const products = mongoProducts.map(async mongoProduct => {
      return MongoProductToProductAdapter.make(mongoProduct)
    })

    return Promise.all(products)
  }

  public save = async (product: Product, ownerId: string): Promise<Product> => {
    try {
      const measurement = await this.measurementStore.get(product.measurement.id)
      const mongoProduct = await MongoProduct.create({
        name: product.name,
        barcode: product.barcode,
        measurement: measurement.id,
        owner: ownerId
      })

      return MongoProductToProductAdapter.make(mongoProduct)
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        return Promise.reject(error)
      }

      return Promise.reject(new UnableToCreateObjectError(error.message))
    }
  }

  public get = async (productId: string, ownerId: string): Promise<Product> => {
    const product = await this.findProductForOwner(productId, ownerId)
    return product
  }

  public fetchProducWithBarcode = async (barcode: string, ownerId: string): Promise<Product> => {
    const mongoProducts = await MongoProduct.find({ barcode, owner: ownerId })
    const mongoProduct = mongoProducts[0]

    if (!mongoProduct) {
      return Promise.reject(new NotFoundProductWithBarcode(barcode))
    }

    return MongoProductToProductAdapter.make(mongoProduct)
  }

  public remove = async (productId: string, ownerId: string): Promise<Product> => {
    const product = await this.findProductForOwner(productId, ownerId)
    MongoProduct.deleteOne({ _id: product.id }, (error) => {
      if (error) {
        return Promise.reject(new UnableToRemoveObjectError(error))
      }
    })

    return product
  }

  private async findProductForOwner (productId: string, ownerId: string): Promise<Product> {
    const mongoProduct = await MongoProduct.findById(productId)

    if (!mongoProduct) {
      return Promise.reject(new ObjectNotFoundError('Product', productId))
    }

    const mongoProductOwnerId = Types.ObjectId(mongoProduct.owner)
    if (!mongoProductOwnerId.equals(ownerId)) {
      return Promise.reject(new UnauthorizedObjectAccessError())
    }

    return MongoProductToProductAdapter.make(mongoProduct)
  }
}

export default MongoProductStore
