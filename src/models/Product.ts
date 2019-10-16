import Measurement from './Measurement'

class Product {
  public id: string
  public name: string
  public barcode?: string
  public measurement: Measurement

  constructor (id: string, name: string, measurement: Measurement, barcode?: string) {
    this.id = id
    this.name = name
    this.barcode = barcode
    this.measurement = measurement
  }
}

export default Product
