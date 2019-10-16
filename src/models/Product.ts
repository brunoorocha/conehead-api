import Measurement from './Measurement'

class Product {
  public id: string
  public name: string
  public barcode: string
  public measurementId: string
  public measurement?: Measurement

  constructor (id: string, name: string, measurementId: string, barcode?: string) {
    this.id = id
    this.name = name
    this.barcode = barcode
    this.measurementId = measurementId
  }
}

export default Product
