
class Product {
  public id: string
  public name: string
  public barcode: string

  constructor (id: string, name: string, barcode?: string) {
    this.id = id
    this.name = name
    this.barcode = barcode
  }
}

export default Product
