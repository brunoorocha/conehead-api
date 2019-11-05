
export abstract class DataStoreError extends Error {
  message: string;
}

export class UnauthorizedObjectAccessError extends DataStoreError {
  public constructor () {
    super('You don\'t have permission to access this object')
  }
}

export class UnableToRemoveObjectError extends DataStoreError {
  public reason?: string

  public constructor (reason?: string) {
    super('This object could not be removed')
    this.reason = reason
  }
}

export class UnableToCreateObjectError extends DataStoreError {
  public reason?: string

  public constructor (reason?: string) {
    super('This object could not be created')
    this.reason = reason
  }
}

export class ObjectNotFoundError extends DataStoreError {
  public objectName: string
  public objectId: string

  public constructor (objectName: string, objectId: string) {
    super(`The ${objectName} with id ${objectId} could not be found`)
    this.objectName = objectName
    this.objectId = objectId
  }
}