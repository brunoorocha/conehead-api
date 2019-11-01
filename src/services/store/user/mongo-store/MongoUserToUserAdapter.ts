import { MongoUserInterface } from './MongoUserSchema'
import User from '../../../../models/User'

class MongoUserToUserAdapter {
  public static make (mongoUser: MongoUserInterface): User {
    const user = new User(
      mongoUser._id,
      mongoUser.name,
      mongoUser.email
    )

    return user
  }
}

export default MongoUserToUserAdapter
