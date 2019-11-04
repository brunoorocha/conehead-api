import { ValidationError } from 'express-validator'

export default class FieldValidationError extends Error {
  public message: string
  public field: string

  public constructor (message: string, field: string) {
    super()
    this.message = message
    this.field = field
  }
}

export class FieldValidationErrorAdapter {
  public static makeFromValidationError (validationError: ValidationError): FieldValidationError {
    return new FieldValidationError(validationError.msg, validationError.param)
  }
}
