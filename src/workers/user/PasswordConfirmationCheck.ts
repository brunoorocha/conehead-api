import { Meta } from 'express-validator'

export const passwordConfirmationCheck = (value: string, meta: Meta): boolean => {
  const { req } = meta
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password')
  }

  return true
}
