import ProductStore from '../../services/store/product/ProductStore'
import Product from '../../models/Product'

/**
 * @param productStore An implementation of ProductStore interface used to fetch the stored products.
 * @returns A Promise with the array of all products in productStore
 */
const listProductsWorker = async (productStore: ProductStore): Promise<Product[]> => {
  const products = await productStore.fetchAll()
  return products
}

export default listProductsWorker
