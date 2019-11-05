import ProductItem from '../../../models/ProductItem'
import OwnableDataStore from '../OwnableDataStore'

export default interface ProductItemStore extends OwnableDataStore<ProductItem> {
  fetchAllOfProduct (productId: string, ownerId: string): Promise<ProductItem[]>;
}
