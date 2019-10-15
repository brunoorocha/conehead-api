import { Request, Response } from 'express'
import MongoProductStore from '../services/store/product/mongo-store/MongoProductStore'

class ProductController {
  public async store (req: Request, res: Response): Promise<Response> {
    const name: string = req.body.name
    const product = await MongoProductStore.save(name)
    return res.json(product)
  }

  public async index (req: Request, res: Response): Promise<Response> {
    const products = await MongoProductStore.fetchAll()
    return res.json(products)
  }
}

export default new ProductController()
