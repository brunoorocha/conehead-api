import Product from './Product'

class ProductItem {
  public id: string
  public quantity: number
  public price: number
  public expiration: Date
  public createdAt: Date
  public product: Product

  public constructor (id: string, quantity: number, price: number, expiration: Date, createdAt: Date, product: Product) {
    this.id = id
    this.quantity = quantity
    this.price = price
    this.expiration = expiration
    this.createdAt = createdAt
    this.product = product
  }
}

export default ProductItem
