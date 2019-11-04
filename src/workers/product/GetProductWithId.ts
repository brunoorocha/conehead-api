import OwnableDataStore from '../../services/store/OwnableDataStore'
import Product from '../../models/Product'

/**
 * @param productId The id of the product that you want.
 * @param productStore An implementation of ProductStore interface used to fetch the stored product.
 */
const getProductWithId = async (productId: string, userId: string, productStore: OwnableDataStore<Product>): Promise<Product> => {
  const product = await productStore.get(productId, userId)
  return product
}

export default getProductWithId
