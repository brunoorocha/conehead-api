import crypto from 'crypto'

const isPasswordValid = (password: string, hash: string, salt: string): boolean => {
  const hashFromGivenPassword = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
  return hash === hashFromGivenPassword
}

export default isPasswordValid
