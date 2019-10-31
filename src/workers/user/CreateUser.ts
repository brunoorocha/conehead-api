import User from '../../models/User'
import Store from '../../services/store/Store'

const createProductItem = async (name: string, email: string, password: string, userStore: Store<User>): Promise<User> => {
  const user = new User(null, name, email, password)
  const storedUser = await userStore.save(user)
  return storedUser
}

export default createProductItem
