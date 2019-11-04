import ProductItemStore from '../services/store/produtc-item/ProductItemStore'
import MongoProductItemStore from '../services/store/produtc-item/mongo-store/MongoProductItemStore'
import { Request, Response } from 'express'
import CreateProductItemWorker from '../workers/product-item/CreateProductItem'
import ListProductItemsOfProductWorker from '../workers/product-item/ListProductItemsOfProduct'
import GetProductItemWithIdWorker from '../workers/product-item/GetProductItemWithId'
import RequestValidationCheckWorker from '../workers/RequestValidationCheck'
import ResponseError from '../models/errors/ResponseError'

class ProductItemController {
  public productItemStore: ProductItemStore

  public constructor (productItemStore: ProductItemStore = new MongoProductItemStore()) {
    this.productItemStore = productItemStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const productId: string = req.params.productId
      const quantity: number = req.body.quantity
      const price: number = req.body.price
      const expiration: string = req.body.expiration

      const product = await CreateProductItemWorker(quantity, price, expiration, productId, this.productItemStore)
      return res.json(product)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const productId: string = req.params.productId
      const productItems = await ListProductItemsOfProductWorker(productId, this.productItemStore)
      return res.json(productItems)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const productItemId: string = req.params.productItemId
      const productItem = await GetProductItemWithIdWorker(productItemId, this.productItemStore)
      return res.json(productItem)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error })
    }
  }
}

export default new ProductItemController()
