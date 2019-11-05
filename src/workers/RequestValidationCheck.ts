import { Request } from 'express'
import { validationResult } from 'express-validator'
import ResponseError from '../models/errors/ResponseError'
import { FieldValidationErrorAdapter } from '../models/errors/FieldValidationError'

const requestValidationCheck = (req: Request): Promise<ResponseError> => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(validationError => FieldValidationErrorAdapter.makeFromValidationError(validationError))
    const responseError = new ResponseError(400, errors)
    return Promise.reject(responseError)
  }

  return Promise.resolve(null)
}

export default requestValidationCheck
