import UserStore from '../../services/store/user/UserStore'
import User from '../../models/User'

const authenticateUser = async (email: string, password: string, userStore: UserStore): Promise<User> => {
  const user = new User(null, null, email, password)
  const authenticatedUser = await userStore.authenticate(user)
  return authenticatedUser
}

export default authenticateUser
