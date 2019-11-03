import passport from 'passport'
import JWTMiddlewareStrategy from './JWTMiddlewareStrategy'
import express from 'express'

export const AuthMiddleware = () => { // eslint-disable-line
  return passport.authenticate('jwt', { session: false })
}

export default {
  initialize (): express.Handler {
    passport.use(JWTMiddlewareStrategy)
    return passport.initialize()
  }
}
