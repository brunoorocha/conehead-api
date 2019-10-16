import ProductStore from '../../services/store/product/ProductStore'
import Product from '../../models/Product'

/**
 * @param name The name of product that you want to create.
 * @param productStore An implementation of ProductStore interface used to store the created product.
 * @returns A Promise with the stored product.
 */
const createProductWorker = async (name: string, productStore: ProductStore): Promise<Product> => {
  const product = new Product(null, name)
  const storedProduct = await productStore.save(product)
  return storedProduct
}

export default createProductWorker
