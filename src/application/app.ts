import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from '../routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(cors())
  }

  private routes (): void {
    this.express.use(router)
  }

  private database (): void {
    mongoose.connect('mongodb://conehead:mtyrG99i8%409!pUd@ds235378.mlab.com:35378/heroku_vjwbmw5s', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.log(error)
    })
  }
}

export default new App().express
