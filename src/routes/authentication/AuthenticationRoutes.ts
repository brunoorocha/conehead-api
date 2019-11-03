import { Router } from 'express'
import { check } from 'express-validator'
import AuthenticationController from '../../controllers/AuthenticationController'
import passport from 'passport'

const authenticationRoutes = Router()

authenticationRoutes.get('/sessions', passport.authenticate('jwt', { session: false }), AuthenticationController.getUserForToken)

authenticationRoutes.post('/sessions', [
  check('email').exists().isEmail(),
  check('password').exists()
], AuthenticationController.authenticate)

export default authenticationRoutes
