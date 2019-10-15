import { Request, Response } from 'express'
import MongoProductStore from '../services/store/product/mongo-store/MongoProductStore'
import ProductStore from '../services/store/product/ProductStore'
import CreateProductWorker from '../workers/product/CreateProduct'
import ListProductsWorker from '../workers/product/ListProducts'
import GetProductWithId from '../workers/product/GetProductWithId'

class ProductController {
  public productStore: ProductStore

  /**
   * @param { ProductStore } productStore Dependency injection of an implementation of ProductStore interface. It can be ommited because is used an MongoProductStore object for default.
   */
  public constructor (productStore: ProductStore = new MongoProductStore()) {
    this.productStore = productStore
  }

  /**
   * This method is used to create a product in the productStore. To create a product is
   * needed to pass its name in res.body.
   * @param { Request } req An object of Express.Request type
   * @param { Response } res An object of Express.Response type
   * @returns { Promise<Response> } Returns the created product in json format through Reques.json() method
   */
  public store = async (req: Request, res: Response): Promise<Response> => {
    const name: string = req.body.name
    const product = await CreateProductWorker(name, this.productStore)
    return res.json(product)
  }

  /**
   * This method returns all products stored the productStore used in this ProductController.
   * @param { Request } req An object of Express.Request type
   * @param { Response } res An object of Express.Response type
   * @returns { Promise<Response> }
   */
  public index = async (_: Request, res: Response): Promise<Response> => {
    const products = await ListProductsWorker(this.productStore)
    return res.json(products)
  }

  public get = async (req: Request, res: Response): Promise<Response> => {
    const productId: string = req.params.productId
    const product = await GetProductWithId(productId, this.productStore)
    return res.json(product)
  }
}

export default new ProductController()
