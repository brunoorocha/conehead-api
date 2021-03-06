import dotenv from 'dotenv'
import path from 'path'

class Environment {
  readonly environment: string
  readonly apiUrl: string
  readonly apiSecret: string

  public static shared = new Environment()

  private constructor () {
    dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) })
    this.environment = process.env.NODE_ENV
    this.apiUrl = process.env.API_URL
    this.apiSecret = process.env.API_SECRET
  }
}

export default Environment
