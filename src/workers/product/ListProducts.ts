import Store from '../../services/store/Store'
import Product from '../../models/Product'

/**
 * @param productStore An implementation of ProductStore interface used to fetch the stored products.
 * @returns A Promise with the array of all products in productStore
 */
const listProductsWorker = async (productStore: Store<Product>): Promise<Product[]> => {
  const products = await productStore.fetchAll()
  return products
}

export default listProductsWorker
