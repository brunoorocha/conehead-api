import ProductStore from '../services/store/product/ProductStore'
import Product from '../models/Product'

export default async (name: string, productStore: ProductStore): Promise<Product> => {
  const product = new Product(name)
  const storedProduct = await productStore.save(product)
  return storedProduct
}
