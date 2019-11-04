import OwnableDataStore from '../../services/store/OwnableDataStore'
import Product from '../../models/Product'

/**
 * @param productStore An implementation of ProductStore interface used to fetch the stored products.
 * @returns A Promise with the array of all products in productStore
 */
const listProductsWorker = async (userId: string, productStore: OwnableDataStore<Product>): Promise<Product[]> => {
  const products = await productStore.fetchAll(userId)
  return products
}

export default listProductsWorker
