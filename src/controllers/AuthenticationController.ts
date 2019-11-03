import MongoUserStore from '../services/store/user/mongo-store/MongoUserStore'
import UserStore from '../services/store/user/UserStore'
import { Request, Response } from 'express'
import RequestValidationCheck, { ResponseError } from '../workers/RequestValidationCheck'
import AuthenticateUser from '../workers/user/AuthenticateUser'
import User from '../models/User'
import AuthenticatedUser from '../models/AuthenticatedUser'

class AuthenticationController {
  public userStore: UserStore

  public constructor (userStore: UserStore = new MongoUserStore()) {
    this.userStore = userStore
  }

  public getUserForToken = async (req: Request, res: Response): Promise<Response> => {
    const user = req.user as User

    if (!user.id) {
      const error = new Error('Unauthorized')
      return res.status(401).json({ error })
    }

    const token = req.headers.authorization
    const authenticatedUser = new AuthenticatedUser(user, token)
    return res.json(authenticatedUser)
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

export default new AuthenticationController()
