
export default class EncryptedPassword {
  private salt: string
  private hash: string

  public constructor (salt: string, hash: string) {
    this.salt = salt
    this.hash = hash
  }
}
