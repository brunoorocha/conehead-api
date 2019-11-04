import { DataStoreError, UnauthorizedObjectAccessError, ObjectNotFoundError, UnableToRemoveObjectError } from './DataStoreErrors'

export default class ResponseError extends Error {
  public status: number
  public errors: object[]

  public constructor (status = 500, errors: object[] = []) {
    super()
    this.status = status
    this.errors = errors
  }
}

export class ResponseErrorAdapter {
  public static makeFromDataStoreError (dataStoreError: DataStoreError): ResponseError {
    const responseError = new ResponseError()

    if (dataStoreError instanceof UnauthorizedObjectAccessError) {
      responseError.status = 401
      responseError.errors = [{ message: dataStoreError.message }]
      return responseError
    }

    if (dataStoreError instanceof ObjectNotFoundError) {
      responseError.status = 404
      responseError.errors = [{ message: dataStoreError.message }]
      return responseError
    }

    if (dataStoreError instanceof UnableToRemoveObjectError) {
      responseError.status = 500
      responseError.errors = [{ message: dataStoreError.message }]
      return responseError
    }
  }
}
