import Product from '../../../models/Product'

export default interface ProductStore {
  /**
   * @returns An array with all products in this store.
   */
  fetchAll (): Promise<Product[]>;

  /**
   * @param name The name of the product that will be created.
   */
  save (product: Product): Promise<Product>;

  /**
   * @param productId The id of product that you want.
   */
  get (productId: string): Promise<Product>;

  /**
   * @param product The id of product that you want to remove.
   */
  remove (productId: string): Promise<Product>;
}
