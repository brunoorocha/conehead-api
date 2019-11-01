
export default class EncryptedPassword {
  readonly salt: string
  readonly hash: string

  public constructor (salt: string, hash: string) {
    this.salt = salt
    this.hash = hash
  }
}
