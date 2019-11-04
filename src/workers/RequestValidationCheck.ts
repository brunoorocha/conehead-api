import { Request } from 'express'
import { validationResult } from 'express-validator'
import ResponseError from '../models/errors/ResponseError'

const requestValidationCheck = (req: Request): Promise<ResponseError> => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    const responseError = new ResponseError()
    responseError.status = 422
    responseError.errors = validationErrors.array()
    return Promise.reject(responseError)
  }

  return Promise.resolve(null)
}

export default requestValidationCheck
