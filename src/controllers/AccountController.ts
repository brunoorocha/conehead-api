import MongoUserStore from '../services/store/user/mongo-store/MongoUserStore'
import UserStore from '../services/store/user/UserStore'
import { Request, Response } from 'express'
import RequestValidationCheck, { ResponseError } from '../workers/RequestValidationCheck'
import AuthenticateUser from '../workers/user/AuthenticateUser'
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
      return res.json(user)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }

  public authenticate = async (req: Request, res: Response): Promise<Response> => {
    try {
      await RequestValidationCheck(req)
      const email = req.body.email
      const password = req.body.password
      const authenticatedUser = await AuthenticateUser(email, password, this.userStore)
      return res.json(authenticatedUser)
    } catch (error) {
      if ((error as ResponseError).status) {
        return res.status(error.status).json({ errors: error.errors })
      }

      return res.status(500).json({ error: error.message })
    }
  }
}

export default new AccountController()
