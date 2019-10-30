import { MongoUserInterface } from './MongoUserSchema'
import User from '../../../../models/User'

class MongoUserToUserAdapter {
  public static async make (mongoUser: MongoUserInterface): Promise<User> {
    const user = new User(
      mongoUser._id,
      mongoUser.name,
      mongoUser.email,
      mongoUser.password
    )

    return user
  }
}

export default MongoUserToUserAdapter
