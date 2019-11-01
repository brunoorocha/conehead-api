import { Router } from 'express'
import { check } from 'express-validator'
import { passwordConfirmationCheck } from '../../workers/user/PasswordConfirmationCheck'
import AccountController from '../../controllers/AccountController'

const accountRoutes = Router()
accountRoutes.post('/accounts', [
  check('name').exists().isString(),
  check('email').exists().isEmail(),
  check('password').isLength({ min: 6 }),
  check('passwordConfirmation').exists().custom(passwordConfirmationCheck)
], AccountController.store)

accountRoutes.post('/accounts/sessions', [
  check('email').exists().isEmail(),
  check('password').exists()
], AccountController.authenticate)

export default accountRoutes
