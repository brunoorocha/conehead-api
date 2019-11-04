import OwnableDataStore from '../../services/store/OwnableDataStore'
import Product from '../../models/Product'
import Measurement from '../../models/Measurement'

/**
 * @param name The name of product that you want to create.
 * @param barcode The barcode of product that you want to create.
 * @param productStore An implementation of ProductStore interface used to store the created product.
 * @returns A Promise with the stored product.
 */
const createProductWorker = async (name: string, measurementId: string, barcode: string = undefined, userId: string, productStore: OwnableDataStore<Product>): Promise<Product> => {
  const measurement = new Measurement(measurementId, null, null)
  const product = new Product(null, name, measurement, barcode)
  const storedProduct = await productStore.save(product, userId)
  return storedProduct
}

export default createProductWorker
