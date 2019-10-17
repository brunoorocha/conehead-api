import ProductItem from '../../../models/ProductItem'
import Store from '../Store'

export default interface ProductItemStore extends Store<ProductItem> {
  fetchAllOfProduct (productId: string): Promise<ProductItem[]>;
}
