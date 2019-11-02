import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Environment from '../../application/environment'

const generateJWTForUser = (user: User): string => {
  const todayDate = new Date()
  const expirationDate = new Date(todayDate)
  expirationDate.setDate(todayDate.getDate() + 60)
  const apiSecret = Environment.shared.apiSecret

  const token = jwt.sign({
    id: user.id,
    email: user.email,
    exp: parseInt(`${expirationDate.getTime() / 1000}`, 10)
  }, apiSecret)

  return token
}

export default generateJWTForUser
