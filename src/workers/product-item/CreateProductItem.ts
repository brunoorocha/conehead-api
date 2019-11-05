import ProductItemStore from '../../services/store/produtc-item/ProductItemStore'
import ProductItem from '../../models/ProductItem'
import Product from '../../models/Product'

const createProductItem = async (quantity: number, price: number, expiration: string, productId: string, userId: string, productItemStore: ProductItemStore): Promise<ProductItem> => {
  const product = new Product(productId, null, null)
  const productItem = new ProductItem(null, quantity, price, new Date(expiration), new Date(), product)
  const storedProductItem = await productItemStore.save(productItem, userId)
  return storedProductItem
}

export default createProductItem
