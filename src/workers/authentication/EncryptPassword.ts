import EncryptedPassword from './EncryptedPassword'
import crypto from 'crypto'

const encryptPassword = (password: string): EncryptedPassword => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
  const encryptedPassword = new EncryptedPassword(salt, hash)
  return encryptedPassword
}

export default encryptPassword
