import User from '../../models/User'
import Store from '../../services/store/Store'
import { makeAuthenticatedUserFromUser } from './AuthenticateUser'

const createProductItem = async (name: string, email: string, password: string, userStore: Store<User>): Promise<User> => {
  const user = new User(null, name, email, password)
  const storedUser = await userStore.save(user)
  const authenticatedUser = makeAuthenticatedUserFromUser(storedUser)
  return authenticatedUser
}

export default createProductItem
