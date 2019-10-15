import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import ProductController from '../controllers/ProductController'

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
    this.express.use(cors())
  }

  private routes (): void {
    this.express.get('/', (_, res) => {
      return res.json({ gretting: 'Welcome to Conehead API 🧙🏼‍♂️' })
    })

    this.express.get('/products', ProductController.index)
    this.express.post('/products', ProductController.store)
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
