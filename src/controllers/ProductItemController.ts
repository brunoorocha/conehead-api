import ProductItemStore from '../services/store/produtc-item/ProductItemStore'
import MongoProductItemStore from '../services/store/produtc-item/mongo-store/MongoProductItemStore'
import { Request, Response } from 'express'
import CreateProductItemWorker from '../workers/product-item/CreateProductItem'

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
}

export default new ProductItemController()
