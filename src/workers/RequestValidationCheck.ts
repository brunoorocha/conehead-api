import { Request } from 'express'
import { validationResult } from 'express-validator'

export class ResponseError extends Error {
  public status: number
  public errors: object[]
}

const requestValidationCheck = (req: Request): Promise<ResponseError> => {
  console.log(req.body)
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
