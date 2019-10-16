import Store from '../../services/store/Store'
import Product from '../../models/Product'

/**
 * @param name The name of product that you want to create.
 * @param barcode The barcode of product that you want to create.
 * @param productStore An implementation of ProductStore interface used to store the created product.
 * @returns A Promise with the stored product.
 */
const createProductWorker = async (name: string, measurementId: string, barcode: string = undefined, productStore: Store<Product>): Promise<Product> => {
  const product = new Product(null, name, measurementId, barcode)
  const storedProduct = await productStore.save(product)
  return storedProduct
}

export default createProductWorker
