import UserStore from '../UserStore'
import User from '../../../../models/User'
import { MongoUser, MongoUserInterface } from './MongoUserSchema'
import MongoUserToUserAdapter from './MongoUserToUserAdapter'
import EncryptPassword from '../../../../workers/crypto/EncryptPassword'
import IsPasswordValid from '../../../../workers/crypto/IsPasswordValid'

class MongoUserStore implements UserStore {
  public async fetchAll (): Promise<User[]> {
    const mongoUsers = await MongoUser.find()
    const users = mongoUsers.map(mongoUser => MongoUserToUserAdapter.make(mongoUser))
    return users
  }

  public save = async (user: User): Promise<User> => {
    const userWithEmailAlreadyExists = await this.findByEmail(user.email)
    if (userWithEmailAlreadyExists) {
      return Promise.reject(new Error(`Already exists a user using email ${user.email}`))
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
      return Promise.reject(new Error(`There's no user with id ${userId}`))
    }

    const user = MongoUserToUserAdapter.make(mongoUser)
    return user
  }

  public async remove (userId: string): Promise<User> {
    const user = await this.get(userId)
    MongoUser.deleteOne({ _id: user.id }, error => {
      if (error) {
        return Promise.reject(error)
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
      const userNotFound = new Error(`Theres no user with email ${user.email}`)
      return Promise.reject(userNotFound)
    }

    if (!IsPasswordValid(user.password, mongoUser.hash, mongoUser.salt)) {
      const passwordDoesntMatch = new Error('The password doesn\'t match with the password of user')
      return Promise.reject(passwordDoesntMatch)
    }

    const authenticatedUser = MongoUserToUserAdapter.make(mongoUser)
    return authenticatedUser
  }
}

export default MongoUserStore
