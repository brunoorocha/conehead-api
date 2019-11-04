import ResponseError, { ResponseErrorAdapter } from '../../models/errors/ResponseError'
import { DataStoreError } from '../../models/errors/DataStoreErrors'
import { Response } from 'express'

const errorHandler = (res: Response, error: Error): Response => {
  let responseError = new ResponseError()

  if (error instanceof ResponseError) {
    responseError = error
  }

  if (error instanceof DataStoreError) {
    responseError = ResponseErrorAdapter.makeFromDataStoreError((error as DataStoreError))
  }

  return res.status(responseError.status).json({ errors: responseError.errors })
}

export default errorHandler
