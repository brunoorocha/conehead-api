import { Router } from 'express'
import greetingRoutes from './greeting/greetingRoutes'
import productRoutes from './product/productRoutes'
import productItemRoutes from './product-item/ProductItemRoutes'
import measurementRoutes from './measurement/MeasurementRoutes'
import notificationRoutes from './notifications/NotificationRoutes'

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
    this.routes.push(productItemRoutes)
    this.routes.push(measurementRoutes)
    this.routes.push(notificationRoutes)
  }
}

export default AppRouter.shared.router
