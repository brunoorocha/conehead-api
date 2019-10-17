import ProductItemStore from '../../services/store/produtc-item/ProductItemStore'
import ProductItem from '../../models/ProductItem'

const listProductItemsOfProduct = async (productId: string, productItemStore: ProductItemStore): Promise<ProductItem[]> => {
  const productItems = await productItemStore.fetchAllOfProduct(productId)
  return productItems
}

export default listProductItemsOfProduct
