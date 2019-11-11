
export abstract class DataStoreError extends Error {
  message: string;
  errorCode: string;
}

export class UnauthorizedObjectAccessError extends DataStoreError {
  public constructor () {
    super('You don\'t have permission to access this object')
    this.errorCode = 'unauthorizedObjectAccess'
  }
}

export class UnableToRemoveObjectError extends DataStoreError {
  public reason?: string

  public constructor (reason?: string) {
    super('This object could not be removed')
    this.reason = reason
    this.errorCode = 'unableToRemoveObject'
  }
}

export class UnableToCreateObjectError extends DataStoreError {
  public reason?: string

  public constructor (reason?: string) {
    super('This object could not be created')
    this.reason = reason
    this.errorCode = 'unableToCreateObject'
  }
}

export class ObjectNotFoundError extends DataStoreError {
  public objectName: string
  public objectId: string

  public constructor (objectName: string, objectId: string) {
    super(`The ${objectName} with id ${objectId} could not be found`)
    this.objectName = objectName
    this.objectId = objectId
    this.errorCode = 'objectNotFound'
  }
}

export class NotFoundUserWithEmailError extends DataStoreError {
  public email: string

  public constructor (email: string) {
    super(`There's no user with email ${email}`)
    this.email = email
    this.errorCode = 'notFoundUserWithEmail'
  }
}

export class PasswordDoesntMatchForUserWithEmailError extends DataStoreError {
  public constructor (email: string) {
    super(`The password doesn't match for user with email ${email}`)
    this.errorCode = 'passwordDoesntMatchForUserWithEmail'
  }
}

export class ObjectWithThisPropertyAlreadyExists extends DataStoreError {
  public objectName: string
  public propertyName: string
  public propertyValue: string | number

  public constructor (objectName: string, propertyName: string, propertyValue: string | number) {
    super(`Already exists a ${objectName} with ${propertyName} ${propertyValue}`)
    this.objectName = objectName
    this.propertyName = propertyName
    this.propertyValue = propertyValue
    this.errorCode = 'objectWithThisPropertyAlreadyExists'
  }
}
