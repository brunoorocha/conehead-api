import { Router } from 'express'
import { check } from 'express-validator'
import { passwordConfirmationCheck } from '../../workers/user/PasswordConfirmationCheck'
import AccountController from '../../controllers/AccountController'

const accountRoutes = Router()
accountRoutes.post('/accounts', [
  check('name').exists().isString().isLength({ min: 3 }),
  check('email').exists().isEmail(),
  check('password').isLength({ min: 6 }),
  check('passwordConfirmation').exists().isLength({ min: 6 }).custom(passwordConfirmationCheck)
], AccountController.store)

export default accountRoutes
