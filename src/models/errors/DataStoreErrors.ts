
export abstract class DataStoreError extends Error {
  message: string;
}

export class UnauthorizedObjectAccessError extends DataStoreError {
  public constructor () {
    super()
    this.message = 'You don\'t have permission to access this object'
  }
}
