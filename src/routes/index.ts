import { Router } from 'express'
import greetings from './greeting/greetingRoutes'
import products from './product/productRoutes'

class AppRouter {
  public routes: Router[] = []
  public router: Router

  public static shared = new AppRouter()

  private constructor () {
    this.initRoutes()
    this.router = Router()
    this.router.use(this.routes)
  }

  private initRoutes (): void {
    this.routes.push(greetings)
    this.routes.push(products)
  }
}

export default AppRouter.shared.router
