import UserStore from '../UserStore'
import User from '../../../../models/User'
import { MongoUser, MongoUserInterface } from './MongoUserSchema'
import MongoUserToUserAdapter from './MongoUserToUserAdapter'
import EncryptPassword from '../../../../workers/authentication/EncryptPassword'
import IsPasswordValid from '../../../../workers/authentication/IsPasswordValid'
import { ObjectNotFoundError, UnableToRemoveObjectError, NotFoundUserWithEmailError, PasswordDoesntMatchForUserWithEmailError, AlreadyExistsAnUserWithEmailError } from '../../../../models/errors/DataStoreErrors'

class MongoUserStore implements UserStore {
  public async fetchAll (): Promise<User[]> {
    const mongoUsers = await MongoUser.find()
    const users = mongoUsers.map(mongoUser => MongoUserToUserAdapter.make(mongoUser))
    return users
  }

  public save = async (user: User): Promise<User> => {
    const userWithEmailAlreadyExists = await this.findByEmail(user.email)
    if (userWithEmailAlreadyExists) {
      return Promise.reject(new AlreadyExistsAnUserWithEmailError(user.email))
    }

    const encryptedPassword = EncryptPassword(user.password)
    const mongoUser = await MongoUser.create({
      name: user.name,
      email: user.email,
      hash: encryptedPassword.hash,
      salt: encryptedPassword.salt
    })

    const createdUser = MongoUserToUserAdapter.make(mongoUser)
    return Promise.resolve(createdUser)
  }

  public get = async (userId: string): Promise<User> => {
    const mongoUser = await MongoUser.findById(userId)
    if (!mongoUser) {
      return Promise.reject(new ObjectNotFoundError('User', userId))
    }

    const user = MongoUserToUserAdapter.make(mongoUser)
    return user
  }

  public async remove (userId: string): Promise<User> {
    const user = await this.get(userId)
    MongoUser.deleteOne({ _id: user.id }, error => {
      if (error) {
        return Promise.reject(new UnableToRemoveObjectError(error))
      }
    })

    return user
  }

  private async findByEmail (email: string): Promise<MongoUserInterface> {
    const mongoUser = await MongoUser.findOne({ email })
    if (!mongoUser) { return null }
    return Promise.resolve(mongoUser)
  }

  public authenticate = async (user: User): Promise<User> => {
    const mongoUser = await this.findByEmail(user.email)
    if (!mongoUser) {
      return Promise.reject(new NotFoundUserWithEmailError(user.email))
    }

    if (!IsPasswordValid(user.password, mongoUser.hash, mongoUser.salt)) {
      return Promise.reject(new PasswordDoesntMatchForUserWithEmailError(user.email))
    }

    const authenticatedUser = MongoUserToUserAdapter.make(mongoUser)
    return authenticatedUser
  }
}

export default MongoUserStore
