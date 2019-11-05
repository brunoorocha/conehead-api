import ProductItemStore from '../../services/store/produtc-item/ProductItemStore'
import ProductItem from '../../models/ProductItem'

const listProductItemsOfProduct = async (productId: string, userId: string, productItemStore: ProductItemStore): Promise<ProductItem[]> => {
  const productItems = await productItemStore.fetchAllOfProduct(productId, userId)
  return productItems
}

export default listProductItemsOfProduct
