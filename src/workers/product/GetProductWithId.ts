import ProductStore from '../../services/store/product/ProductStore'
import Product from '../../models/Product'

/**
 * @param productId The id of the product that you want.
 * @param productStore An implementation of ProductStore interface used to fetch the stored product.
 */
const getProductWithId = async (productId: string, productStore: ProductStore): Promise<Product> => {
  const product = await productStore.get(productId)
  return product
}

export default getProductWithId
