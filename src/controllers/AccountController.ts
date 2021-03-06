import MongoUserStore from '../services/store/user/mongo-store/MongoUserStore'
import UserStore from '../services/store/user/UserStore'
import { Request, Response } from 'express'
import RequestValidationCheck from '../workers/RequestValidationCheck'
import ErrorHandler from '../workers/error-handler/ErrorHandler'
import CreateUser from '../workers/user/CreateUser'

class AccountController {
  public userStore: UserStore

  public constructor (userStore: UserStore = new MongoUserStore()) {
    this.userStore = userStore
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheck(req)
      const name: string = req.body.name
      const email: string = req.body.email
      const password: string = req.body.password
      const user = await CreateUser(name, email, password, this.userStore)
      return res.status(201).json(user)
    } catch (error) {
      return ErrorHandler(res, error)
    }
  }
}

export default new AccountController()
