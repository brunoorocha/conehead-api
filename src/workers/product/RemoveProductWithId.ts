import ProductStore from '../../services/store/product/ProductStore'
import Product from '../../models/Product'

/**
 * @param productId The id of the product that you want to remove.
 * @param productStore An implementation of ProductStore interface where the product is stored.
 */
const removeProductWithId = async (productId: string, productStore: ProductStore): Promise<Product> => {
  const product = await productStore.remove(productId)
  return product
}

export default removeProductWithId
