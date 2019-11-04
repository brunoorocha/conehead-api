import OwnableDataStore from '../../services/store/OwnableDataStore'
import Product from '../../models/Product'

/**
 * @param productId The id of the product that you want to remove.
 * @param productStore An implementation of ProductStore interface where the product is stored.
 */
const removeProductWithId = async (productId: string, userId: string, productStore: OwnableDataStore<Product>): Promise<Product> => {
  const product = await productStore.remove(productId, userId)
  return product
}

export default removeProductWithId
