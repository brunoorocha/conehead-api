import passport from 'passport'
import JWTMiddlewareStrategy from './JWTMiddlewareStrategy'
import express from 'express'

export default {
  initialize (): express.Handler {
    passport.use(JWTMiddlewareStrategy)
    return passport.initialize()
  }
}
