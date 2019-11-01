import MongoUserStore from '../services/store/user/mongo-store/MongoUserStore'
import Store from '../services/store/Store'
import User from '../models/User'
import { Request, Response } from 'express'
import CreateUser from '../workers/user/CreateUser'
import RequestValidationCheck, { ResponseError } from '../workers/RequestValidationCheck'

class AccountController {
  public userStore: Store<User>

  public constructor (userStore: Store<User> = new MongoUserStore()) {
    this.userStore = userStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheck(req)
      const name: string = req.body.name
      const email: string = req.body.email
      const password: string = req.body.password
      const user = await CreateUser(name, email, password, this.userStore)
      return res.json(user)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }
}

export default new AccountController()
