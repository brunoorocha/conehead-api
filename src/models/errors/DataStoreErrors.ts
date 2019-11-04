
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

export class ObjectNotFoundError extends DataStoreError {
  public constructor (message?: string) {
    message = message || 'This object could not be found'
    super(message)
  }
}
