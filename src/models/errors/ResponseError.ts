import { DataStoreError, UnauthorizedObjectAccessError, ObjectNotFoundError, UnableToRemoveObjectError, UnableToCreateObjectError, ObjectWithThisPropertyAlreadyExists, NotFoundUserWithEmailError, PasswordDoesntMatchForUserWithEmailError, AlreadyExistsAnUserWithEmailError, NotFoundProductWithBarcode } from './DataStoreErrors'

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
      responseError.errors = [{
        message: dataStoreError.message,
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof ObjectNotFoundError) {
      responseError.status = 404
      responseError.errors = [{
        message: dataStoreError.message,
        object: dataStoreError.objectName,
        objectId: dataStoreError.objectId,
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof UnableToRemoveObjectError) {
      responseError.status = 500
      responseError.errors = [{
        message: dataStoreError.message,
        reason: dataStoreError.reason,
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof UnableToCreateObjectError) {
      responseError.status = 500
      responseError.errors = [{
        message: dataStoreError.message,
        reason: dataStoreError.reason,
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof ObjectWithThisPropertyAlreadyExists) {
      responseError.status = 400
      responseError.errors = [{
        message: dataStoreError.message,
        field: dataStoreError.propertyName,
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof NotFoundUserWithEmailError) {
      responseError.status = 404
      responseError.errors = [{
        message: dataStoreError.message,
        field: 'email',
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof AlreadyExistsAnUserWithEmailError) {
      responseError.status = 400
      responseError.errors = [{
        message: dataStoreError.message,
        field: 'email',
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof PasswordDoesntMatchForUserWithEmailError) {
      responseError.status = 400
      responseError.errors = [{
        message: dataStoreError.message,
        field: 'password',
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }

    if (dataStoreError instanceof NotFoundProductWithBarcode) {
      responseError.status = 404
      responseError.errors = [{
        message: dataStoreError.message,
        field: 'barcode',
        errorCode: dataStoreError.errorCode
      }]
      return responseError
    }
  }
}
