import Product from '../../../models/Product'

export default interface ProductStore {
  /**
   * @returns An array with all products in this store
   */
  fetchAll (): Promise<Product[]>;

  /**
   * @param name The name of the product that will be created
   */
  save (product: Product): Promise<Product>;
}
