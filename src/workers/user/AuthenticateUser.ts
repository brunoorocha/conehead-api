import UserStore from '../../services/store/user/UserStore'
import AuthenticatedUser from '../../models/AuthenticatedUser'
import User from '../../models/User'
import GenerateJWTForUser from '../authentication/GenerateJWT'

export const makeAuthenticatedUserFromUser = (user: User, token?: string): AuthenticatedUser => {
  if (token) {
    return new AuthenticatedUser(user, token)
  }

  const userToken = GenerateJWTForUser(user)
  const authenticatedUser = new AuthenticatedUser(user, userToken)
  return authenticatedUser
}

const authenticateUser = async (email: string, password: string, userStore: UserStore): Promise<AuthenticatedUser> => {
  const userCredentials = new User(null, null, email, password)
  const user = await userStore.authenticate(userCredentials)
  const authenticatedUser = makeAuthenticatedUserFromUser(user)
  return authenticatedUser
}

export default authenticateUser
