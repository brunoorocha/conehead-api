import ProductItemStore from '../services/store/produtc-item/ProductItemStore'
import MongoProductItemStore from '../services/store/produtc-item/mongo-store/MongoProductItemStore'
import { Request, Response } from 'express'
import CreateProductItemWorker from '../workers/product-item/CreateProductItem'
import ListProductItemsOfProductWorker from '../workers/product-item/ListProductItemsOfProduct'
import GetProductItemWithIdWorker from '../workers/product-item/GetProductItemWithId'

class ProductItemController {
  public productItemStore: ProductItemStore

  public constructor (productItemStore: ProductItemStore = new MongoProductItemStore()) {
    this.productItemStore = productItemStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    const productId: string = req.params.productId
    const quantity: number = req.body.quantity
    const price: number = req.body.price
    const expiration: string = req.body.expiration

    const product = await CreateProductItemWorker(quantity, price, expiration, productId, this.productItemStore)
    return res.json(product)
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    const productId: string = req.params.productId
    const productItems = await ListProductItemsOfProductWorker(productId, this.productItemStore)
    return res.json(productItems)
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    const productItemId: string = req.params.productItemId
    const productItem = await GetProductItemWithIdWorker(productItemId, this.productItemStore)
    return res.json(productItem)
  }
}

export default new ProductItemController()
