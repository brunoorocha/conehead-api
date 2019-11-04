import { DataStoreError, UnauthorizedObjectAccessError } from './DataStoreErrors'

export default class ResponseError extends Error {
  public status: number
  public errors: object[]

  public constructor (status = 500, errors: object[] = []) {
    super()
    this.status = status
    this.errors = errors
  }
}

export class ResponseErrorFactory {
  public static responseErrorFromDataStoreError (dataStoreError: DataStoreError): ResponseError {
    const responseError = new ResponseError()

    if (dataStoreError as UnauthorizedObjectAccessError) {
      responseError.status = 401
      responseError.errors = [{ message: dataStoreError.message }]
      return responseError
    }
  }
}
