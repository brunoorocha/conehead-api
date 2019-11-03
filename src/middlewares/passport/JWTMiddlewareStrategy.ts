import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import Environment from '../../application/environment'
import UserStore from '../../services/store/user/UserStore'
import MongoUserStore from '../../services/store/user/mongo-store/MongoUserStore'

const JWTMiddlewareStrategy = (userStore: UserStore): JWTStrategy => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Environment.shared.apiSecret
  }

  return new JWTStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await userStore.get(jwtPayload.sub)
      return done(null, user)
    } catch (error) {
      return done(error, null)
    }
  })
}

export default JWTMiddlewareStrategy(new MongoUserStore())
