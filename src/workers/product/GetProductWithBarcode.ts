import ProductStore from '../../services/store/product/ProductStore'
import Product from '../../models/Product'

const getProductWithBarcode = async (barcode: string, userId: string, productStore: ProductStore): Promise<Product> => {
  const product = await productStore.fetchProducWithBarcode(barcode, userId)
  return product
}

export default getProductWithBarcode
