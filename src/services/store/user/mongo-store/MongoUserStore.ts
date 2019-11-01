import Store from '../../Store'
import User from '../../../../models/User'
import { MongoUser } from './MongoUserSchema'
import MongoUserToUserAdapter from './MongoUserToUserAdapter'
import { encryptPassword } from '../../../../workers/crypto/EncryptPassword'

class MongoUserStore implements Store<User> {
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

    const encryptedPassword = encryptPassword(user.password)
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

  private async findByEmail (email: string): Promise<User> {
    const mongoUser = await MongoUser.findOne({ email })
    if (!mongoUser) { return null }

    const user = MongoUserToUserAdapter.make(mongoUser)
    return Promise.resolve(user)
  }
}

export default MongoUserStore
