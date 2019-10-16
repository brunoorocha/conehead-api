import Store from '../../services/store/Store'
import Product from '../../models/Product'
import Measurement from '../../models/Measurement'

const populateProductMeasurement = async (product: Product, measurementStore: Store<Measurement>): Promise<Product> => {
  const measurement = await measurementStore.get(product.measurementId)
  const poupulatedProduct = { ...product }
  poupulatedProduct.measurement = measurement
  poupulatedProduct.measurementId = undefined
  return poupulatedProduct
}

export default populateProductMeasurement
