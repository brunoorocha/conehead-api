import User from './User'

class AuthenticatedUser {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly token: string

  public constructor (user: User, token: string) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.token = token
  }
}

export default AuthenticatedUser
