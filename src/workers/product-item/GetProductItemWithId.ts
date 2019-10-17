import ProductItemStore from '../../services/store/produtc-item/ProductItemStore'
import ProductItem from '../../models/ProductItem'

const getProductItemWithId = async (productItemId: string, productItemStore: ProductItemStore): Promise<ProductItem> => {
  const productItem = await productItemStore.get(productItemId)
  return productItem
}

export default getProductItemWithId
