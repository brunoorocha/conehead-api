import Store from '../../Store'
import User from '../../../../models/User'
import { MongoUser } from './MongoUserSchema'
import MongoUserToUserAdapter from './MongoUserToUserAdapter'

class MongoUserStore implements Store<User> {
  public async fetchAll (): Promise<User[]> {
    const mongoUsers = await MongoUser.find()
    const users = mongoUsers.map(mongoUser => MongoUserToUserAdapter.make(mongoUser))
    return Promise.all(users)
  }

  public async save (user: User): Promise<User> {
    const mongoUser = await MongoUser.create({
      name: user.name,
      email: user.email,
      password: user.password
    })

    const createdUser = await MongoUserToUserAdapter.make(mongoUser)
    return createdUser
  }

  public get = async (userId: string): Promise<User> => {
    const mongoUser = await MongoUser.findById(userId)
    if (!mongoUser) {
      return Promise.reject(new Error(`There's no user with id ${userId}`))
    }

    const user = await MongoUserToUserAdapter.make(mongoUser)
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
}

export default MongoUserStore
