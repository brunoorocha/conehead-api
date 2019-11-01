import Store from '../Store'
import User from '../../../models/User'

export default interface UserStore extends Store<User> {
  authenticate (user: User): Promise<User>;
}
