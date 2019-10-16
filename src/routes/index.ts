import { Router } from 'express'
import greetingRoutes from './greeting/GreetingRoutes'
import productRoutes from './product/ProductRoutes'
import measurementRoutes from './measurement/MeasurementRoutes'

class AppRouter {
  public routes: Router[] = []
  public router: Router

  public static shared = new AppRouter()

  private constructor () {
    this.initRoutes()
    this.router = Router()
    this.router.use('/api/v1/', this.routes)
  }

  private initRoutes (): void {
    this.routes.push(greetingRoutes)
    this.routes.push(productRoutes)
    this.routes.push(measurementRoutes)
  }
}

export default AppRouter.shared.router
