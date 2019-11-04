import ProductItemStore from '../services/store/produtc-item/ProductItemStore'
import MongoProductItemStore from '../services/store/produtc-item/mongo-store/MongoProductItemStore'
import { Request, Response } from 'express'
import CreateProductItemWorker from '../workers/product-item/CreateProductItem'
import ListProductItemsOfProductWorker from '../workers/product-item/ListProductItemsOfProduct'
import GetProductItemWithIdWorker from '../workers/product-item/GetProductItemWithId'
import RequestValidationCheckWorker from '../workers/RequestValidationCheck'
import ErrorHandlingWorker from '../workers/error-handler/ErrorHandler'
import User from '../models/User'

class ProductItemController {
  public productItemStore: ProductItemStore

  public constructor (productItemStore: ProductItemStore = new MongoProductItemStore()) {
    this.productItemStore = productItemStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const productId: string = req.params.productId
      const quantity: number = req.body.quantity
      const price: number = req.body.price
      const expiration: string = req.body.expiration

      const product = await CreateProductItemWorker(quantity, price, expiration, productId, user.id, this.productItemStore)
      return res.json(product)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const productId: string = req.params.productId
      const productItems = await ListProductItemsOfProductWorker(productId, user.id, this.productItemStore)
      return res.json(productItems)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const productItemId: string = req.params.productItemId
      const productItem = await GetProductItemWithIdWorker(productItemId, user.id, this.productItemStore)
      return res.json(productItem)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }
}

export default new ProductItemController()
