
export abstract class DataStoreError extends Error {
  message: string;
}

export class UnauthorizedObjectAccessError extends DataStoreError {
  message = 'You don\'t have permission to access this object'
}
