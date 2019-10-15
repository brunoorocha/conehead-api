import Product from '../../../models/Product'

export interface ProductStoreContract {
  fetchAll (): Promise<Product[]>;
  save (name: string): Promise<Product>;
}
