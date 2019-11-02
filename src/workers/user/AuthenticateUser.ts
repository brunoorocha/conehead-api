import UserStore from '../../services/store/user/UserStore'
import AuthenticatedUser from '../../models/AuthenticatedUser'
import User from '../../models/User'
import GenerateJWTForUser from '../authentication/GenerateJWT'

const authenticateUser = async (email: string, password: string, userStore: UserStore): Promise<AuthenticatedUser> => {
  const userCredentials = new User(null, null, email, password)
  const user = await userStore.authenticate(userCredentials)
  const userToken = GenerateJWTForUser(user)
  const authenticatedUser = new AuthenticatedUser(user, userToken)
  return authenticatedUser
}

export default authenticateUser
