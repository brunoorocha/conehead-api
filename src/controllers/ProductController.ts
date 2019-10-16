import { Request, Response } from 'express'
import MongoProductStore from '../services/store/product/mongo-store/MongoProductStore'
import Store from '../services/store/Store'
import CreateProductWorker from '../workers/product/CreateProduct'
import ListProductsWorker from '../workers/product/ListProducts'
import GetProductWithId from '../workers/product/GetProductWithId'
import RemoveProductWithId from '../workers/product/RemoveProductWithId'
import Product from '../models/Product'

class ProductController {
  public productStore: Store<Product>

  /**
   * @param productStore Dependency injection of an implementation of ProductStore interface. It can be ommited because is used an MongoProductStore object for default.
   */
  public constructor (productStore: Store<Product> = new MongoProductStore()) {
    this.productStore = productStore
  }

  /**
   * This method is used to create a product in the productStore. To create a product is
   * needed to pass its name in res.body.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the created product in json format through Reques.json() method.
   */
  public store = async (req: Request, res: Response): Promise<Response> => {
    const name: string = req.body.name
    const barcode: string = req.body.barcode
    const measurementId: string = req.body.measurementId
    const product = await CreateProductWorker(name, measurementId, barcode, this.productStore)
    return res.json(product)
  }

  /**
   * This method returns all products stored the productStore used in this ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the list of products in json format through Reques.json() method.
   */
  public index = async (_req: Request, res: Response): Promise<Response> => {
    const products = await ListProductsWorker(this.productStore)
    return res.json(products)
  }

  /**
   * This method get a product with a given id from the product store used by ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the product found in json format through Reques.json() method.
   */
  public get = async (req: Request, res: Response): Promise<Response> => {
    const productId: string = req.params.productId
    const product = await GetProductWithId(productId, this.productStore)
    return res.json(product)
  }

  /**
   * This method remove a product from the product store used by ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the removed product in json format through Reques.json() method.
   */
  public remove = async (req: Request, res: Response): Promise<Response> => {
    const productId: string = req.params.productId
    const removedProduct = await RemoveProductWithId(productId, this.productStore)
    return res.json(removedProduct)
  }
}

export default new ProductController()
