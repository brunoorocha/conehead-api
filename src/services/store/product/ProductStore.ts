import OwnableDataStore from '../OwnableDataStore'
import Product from '../../../models/Product'

export default interface ProductStore extends OwnableDataStore<Product> {
  fetchProducWithBarcode (barcode: string, ownerId: string): Promise<Product>;
}
