import { Request, Response } from 'express'
import MongoProductStore from '../services/store/product/mongo-store/MongoProductStore'
import OwnableDataStore from '../services/store/OwnableDataStore'
import CreateProductWorker from '../workers/product/CreateProduct'
import ListProductsWorker from '../workers/product/ListProducts'
import GetProductWithId from '../workers/product/GetProductWithId'
import RemoveProductWithId from '../workers/product/RemoveProductWithId'
import RequestValidationCheckWorker from '../workers/RequestValidationCheck'
import ErrorHandlingWorker from '../workers/error-handler/ErrorHandler'
import Product from '../models/Product'
import User from '../models/User'

class ProductController {
  public productStore: OwnableDataStore<Product>

  /**
   * @param productStore Dependency injection of an implementation of ProductStore interface. It can be ommited because is used an MongoProductStore object for default.
   */
  public constructor (productStore: OwnableDataStore<Product> = new MongoProductStore()) {
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
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const name: string = req.body.name
      const barcode: string = req.body.barcode
      const measurementId: string = req.body.measurementId
      const product = await CreateProductWorker(name, measurementId, barcode, user.id, this.productStore)
      return res.json(product)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  /**
   * This method returns all products stored the productStore used in this ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the list of products in json format through Reques.json() method.
   */
  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.user as User
      const products = await ListProductsWorker(user.id, this.productStore)
      return res.json(products)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  /**
   * This method get a product with a given id from the product store used by ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the product found in json format through Reques.json() method.
   */
  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const productId: string = req.params.productId
      const product = await GetProductWithId(productId, user.id, this.productStore)
      return res.json(product)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }

  /**
   * This method remove a product from the product store used by ProductController.
   * @param req An object of Express.Request type.
   * @param res An object of Express.Response type.
   * @returns Returns the removed product in json format through Reques.json() method.
   */
  public remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheckWorker(req)
      const user = req.user as User
      const productId: string = req.params.productId
      const removedProduct = await RemoveProductWithId(productId, user.id, this.productStore)
      return res.json(removedProduct)
    } catch (error) {
      return ErrorHandlingWorker(res, error)
    }
  }
}

export default new ProductController()
